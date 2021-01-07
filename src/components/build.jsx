import * as React from "react"

import { applyRatio } from "../utils/ratios"

const BuildCalculator = ({ ratios, units, team }) => {
  const [funds, setFunds] = React.useState("")
  const [selection, setSelection] = React.useState(undefined)
  const [build, setBuild] = React.useState()

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

  return (
    <article className="post-content page-template no-image">
      <div className="post-content-body">
        <p>
          Enter your funds below and select your build to see how many units you
          can buy. (Please note single units builds are not listed below!){" "}
        </p>
        <form
          id="frm1"
          onSubmit={event => {
            event.preventDefault()
            if (selection) {
              const numFunds = parseInt(funds.replaceAll(",", ""))
              setBuild(
                applyRatio(ratios[selection].composition, numFunds, units)
              )
            }
          }}
        >
          {Object.entries(ratios).map(([key, ratio]) => (
            <RatioSelection key={key} name={key} label={ratio.label} />
          ))}
          Funds:
          <input
            type="text"
            name="funds"
            id="funds"
            value={funds}
            onChange={event => setFunds(event.target.value)}
          />
        </form>
        <button className={`button ${team}`} type="submit" form="frm1">
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
