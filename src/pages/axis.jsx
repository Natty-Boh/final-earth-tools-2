import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import { axisRatios, axisUnits, applyRatio } from "../utils/ratios"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AxisPage = () => {
  const [funds, setFunds] = React.useState("")
  const [build, setBuild] = React.useState()

  return (
    <Layout title="Axis Build Calculator">
      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <p>
            Enter your funds below and select your build to see how many units
            you can buy. (Please note single unit builds are not listed below!){" "}
          </p>
          <form
            id="frm1"
            onSubmit={event => {
              event.preventDefault()
              const selection = event.target.elements.unit.value
              if (selection) {
                const numFunds = parseInt(funds.replaceAll(",", ""))
                setBuild(applyRatio(axisRatios[selection], numFunds, axisUnits))
              }
            }}
          >
            <input
              className="axis-radio"
              type="radio"
              id="inf"
              name="unit"
              value="inf"
            />
            <label htmlFor="inf">Infantry (Support heavy)</label>
            <input
              className="axis-radio"
              type="radio"
              id="ainf"
              name="unit"
              value="ainf"
            />
            <label htmlFor="ainf">Infantry (Pure Assuault + medic)</label>
            <input
              className="axis-radio"
              type="radio"
              id="sinf"
              name="unit"
              value="sinf"
            />
            <label htmlFor="sinf">Infantry (Pure Support + medic)</label>
            <input
              className="axis-radio"
              type="radio"
              id="tungsbrem"
              name="unit"
              value="tungsbrem"
            />
            <label htmlFor="tungsbrem">Tungs/Brem (Tanks Anti-Air)</label>
            <input
              className="axis-radio"
              type="radio"
              id="suireb"
              name="unit"
              value="suireb"
            />
            <label htmlFor="suireb">Suirebs</label>
            <input
              className="axis-radio"
              type="radio"
              id="vod"
              name="unit"
              value="vod"
            />
            <label htmlFor="vod">Vodniks/MLR (Jeeps Anti-Infantry)</label>
            <input
              className="axis-radio"
              type="radio"
              id="blk"
              name="unit"
              value="blk"
            />
            <label htmlFor="blk">Black Eagles/Brem</label>
            <input
              className="axis-radio"
              type="radio"
              id="t98"
              name="unit"
              value="t98"
            />
            <label htmlFor="t98">Type 98/Brem</label>
            {/*<input className="axis-radio" onClick={check} type="checkbox" id="existing" name="unit" value="existing"/>*/}
            {/*<label htmlFor="existing" id="label1">I have existing units of this build type</label>*/}
            Funds:{" "}
            <input
              type="text"
              name="funds"
              id="funds"
              value={funds}
              onChange={event => setFunds(event.target.value)}
            />
          </form>
          <button className="button axis" type="submit" form="frm1">
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
            Natty_Boh know about any issues. Thanks to Jorn and Synth for build
            ratios.{" "}
          </p>
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    benchAccounting: file(
      relativePath: { eq: "bench-accounting-49909-unsplash.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AxisPage location={props.location} data={data} {...props} />
    )}
  />
)
