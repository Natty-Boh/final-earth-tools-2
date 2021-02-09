import * as React from "react"

import { applyRatio } from "../utils/ratios"

const BuildCalculator = ({ ratios, units, team }) => {
  const [funds, setFunds] = React.useState("")
  const [selection, setSelection] = React.useState(undefined)
  const [build, setBuild] = React.useState()
  const [key, setKey] = React.useState("")
  const [fetching, setFetching] = React.useState(false)

  const RatioSelection = ({ name, label }) => (
    <>
      <input
        className={`${team}-radio`}
        type="radio"
        name="unit"
        id={name}
        value={name}
        checked={name === selection}
        onChange={() => setSelection(name)}
      />
      <label htmlFor={name}>{label}</label>
    </>
  )

  async function setBuildAndFetchTroops(selection, numFunds) {
    if (key !== "") {
      const allUnitsResponse = await fetch(
        `https://www.finalearth.com/api/allUnits?key=${key}`
      )
      const unitsResponse = await fetch(
        `https://www.finalearth.com/api/units?key=${key}`
      )
      const userResponse = await fetch(
        `https://www.finalearth.com/api/user?key=${key}`
      )

      const unitsJson = await unitsResponse.json()
      const allUnits = await allUnitsResponse.json()
      const userJson = await userResponse.json()

      var unitNet = unitsJson.data
        .map(
          unit =>
            allUnits.data.find(elem => elem.id === unit.id).cost * unit.quantity
        )
        .reduce((a, b) => a + b, 0)

      var cash = userJson.data.funds

      numFunds = cash + unitNet
    }

    setBuild(applyRatio(ratios[selection].composition, numFunds, units))
  }

  return (
    <article className="post-content page-template no-image">
      <div className="post-content-body">
        <p className="calculator-intro">
          Enter your funds or api key below and select your build to see how
          many units you can buy. (Please note single unit builds are not listed
          below!){" "}
        </p>
        <form
          id="frm1"
          onSubmit={event => {
            event.preventDefault()
            if (selection) {
              const numFunds = parseInt(funds.replaceAll(",", ""))

              setFetching(true)
              setBuildAndFetchTroops(selection, numFunds).finally(() =>
                setFetching(false)
              )
            }
          }}
        >
          {Object.entries(ratios).map(([key, ratio]) => (
            <RatioSelection
              key={key}
              name={key}
              label={ratio.label}
              disabled={fetching}
            />
          ))}
        </form>
        <label htmlFor="funds">Funds:</label>
        <input
          type="text"
          name="funds"
          id="funds"
          value={funds}
          disabled={fetching}
          onChange={event => {
            let rawFunds = event.target.value
            rawFunds = rawFunds.match(/\s*\$?\s*([0-9,.]+[kmb]?)\s*/)?.[1] ?? ""
            rawFunds = rawFunds.replaceAll(",", "")
            if (rawFunds.slice(-1) === "k") {
              rawFunds = parseInt(parseFloat(rawFunds.slice(0, -1) * 1000))
            } else if (rawFunds.slice(-1) === "m") {
              rawFunds = parseInt(parseFloat(rawFunds.slice(0, -1) * 1000000))
            } else if (rawFunds.slice(-1) === "b") {
              rawFunds = parseInt(
                parseFloat(rawFunds.slice(0, -1) * 1000000000)
              )
            }
            rawFunds = rawFunds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            setFunds(rawFunds)
          }}
        />
        <p>or</p>
        <label htmlFor="key">
          <div className="hint">
            [BETA] Total units you can have with cash on hand + current troops
          </div>{" "}
          <div> API key:</div>
        </label>
        <input
          type="text"
          name="key"
          id="key"
          value={key}
          disabled={fetching}
          onChange={event => {
            setKey(event.target.value)
          }}
        />
        <button
          className={`button ${team}`}
          type="submit"
          form="frm1"
          diabled={fetching}
        >
          Submit
        </button>
        {/* Break */}
        {build && (
          <div className="unit-container">
            {Object.values(build).map(({ quantity, unit: { label } }) => (
              <p key={label} className="unit-count">{`${quantity} ${label}${
                quantity === 1 ? "" : "s"
              }`}</p>
            ))}
          </div>
        )}
        <p id="demo2"></p>
        {/* Break */}

        <p className="note">
          {" "}
          *Please note this an early version so it may be a bit buggy. Let
          Natty_Boh know about any issues. Thanks to jorn for providing build
          ratios!{" "}
        </p>
      </div>
    </article>
  )
}

export default React.memo(BuildCalculator)
