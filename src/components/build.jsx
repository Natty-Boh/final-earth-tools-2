import * as React from "react"

import { applyRatio } from "../utils/ratios"
import Tooltip from "@material-ui/core/Tooltip"
import { withStyles } from "@material-ui/core/styles"

const BuildCalculator = ({ ratios, units, team, singleUnit }) => {
  const [funds, setFunds] = React.useState("")
  const [selection, setSelection] = React.useState(undefined)
  const [build, setBuild] = React.useState()
  const [key, setKey] = React.useState("")
  const [fetching, setFetching] = React.useState(false)
  const [isSingleUnit, setIsSingleUnit] = React.useState(false)

  const RatioSelection = ({ name, label, tooltip }) => (
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
      <LightTooltip title={tooltip} placement="left" enterTouchDelay={1}>
        <label htmlFor={name}>{label}</label>
      </LightTooltip>
    </>
  )

  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 13,
    },
  }))(Tooltip)

  async function setBuildAndFetchTroops(selection, numFunds) {
    if (key !== "") {
      try {
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

        if (!unitsJson.error) {
          const unitNet = unitsJson.data
            .map(
              unit =>
                allUnits.data.find(elem => elem.id === unit.id).cost *
                unit.quantity
            )
            .reduce((a, b) => a + b, 0)

          const cash = userJson.data.funds

          numFunds = cash + unitNet
          if (isSingleUnit) {
            setBuild(
              applyRatio(singleUnit[selection].composition, numFunds, units)
            )
          } else {
            setBuild(applyRatio(ratios[selection].composition, numFunds, units))
          }
        } else {
          setBuild({
            error: `Something went wrong! The API returned an error: ${unitsJson.reason}`,
          })
        }
      } catch (error) {
        setBuild({
          error: `Something went wrong! Encountered an error when trying to contact the API: ${error.message}`,
        })
      }
    } else {
      if (isSingleUnit) {
        setBuild(applyRatio(singleUnit[selection].composition, numFunds, units))
      } else {
        setBuild(applyRatio(ratios[selection].composition, numFunds, units))
      }
    }
  }

  return (
    <article className="page-content page-template no-image">
      <div className="post-content-body">
        <p className="calculator-intro">
          Enter your funds or api key below and select your build to see how
          many units you can buy. (Please note single unit builds are included
          just for reference.){" "}
        </p>
        <div class="tab">
          <button
            className={`tablinks ${team} ${isSingleUnit ? "" : "selected"}`}
            onClick={() => {
              setIsSingleUnit(false)
            }}
          >
            Multi Unit Builds
          </button>
          <button
            className={`tablinks ${team} ${isSingleUnit ? "selected" : ""}`}
            onClick={() => {
              setIsSingleUnit(true)
            }}
          >
            Single Unit Builds
          </button>
        </div>
        <form
          id="frm1"
          onSubmit={event => {
            event.preventDefault()
            if (selection) {
              const numFunds = parseInt(funds.replace(/,/g, ""))

              setFetching(true)
              setBuildAndFetchTroops(selection, numFunds).finally(() =>
                setFetching(false)
              )
            } else {
              setBuild({ error: "Error: no build selected" })
            }
          }}
        >
          {Object.entries(isSingleUnit ? singleUnit : ratios).map(
            ([key, ratio]) => (
              <RatioSelection
                key={key}
                name={key}
                label={ratio.label}
                tooltip={ratio.tooltip}
                disabled={fetching}
              />
            )
          )}
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
            rawFunds = rawFunds.replace(/,/g, "")
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
          disabled={fetching}
        >
          Submit
        </button>
        {/* Break */}
        {build && (
          <div className="unit-container">
            {build.error ? (
              <p className="unit-count">{build.error}</p>
            ) : (
              Object.values(build).map(({ quantity, unit: { label } }) => (
                <p key={label} className="unit-count">{`${quantity} ${label}${
                  quantity === 1 ? "" : "s"
                }`}</p>
              ))
            )}
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
