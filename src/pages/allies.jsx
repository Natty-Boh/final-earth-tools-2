import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import { alliesRatios, alliesUnits, applyRatio } from "../utils/ratios"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AlliesPage = () => {
  const [funds, setFunds] = React.useState("")
  const [build, setBuild] = React.useState()

  return (
    <Layout title="Allies Build Calculator">
      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <p>
            Enter your funds below and select your build to see how many units
            you can buy.{" "}
          </p>
          <form
            id="frm1"
            onSubmit={event => {
              event.preventDefault()
              const selection = event.target.elements.unit.value
              if (selection) {
                const numFunds = parseInt(funds.replaceAll(",", ""))
                setBuild(applyRatio(alliesRatios[selection], numFunds, alliesUnits))
              }
            }}
          >
            <input
              className="allies-radio"
              type="radio"
              id="inf"
              name="unit"
              value="inf"
            />
            <label htmlFor="inf">Infantry (Support heavy)</label>
            <input
              className="allies-radio"
              type="radio"
              id="ainf"
              name="unit"
              value="ainf"
            />
            <label htmlFor="ainf">Infantry (Pure Assuault + medic)</label>
            <input
              className="allies-radio"
              type="radio"
              id="sinf"
              name="unit"
              value="sinf"
            />
            <label htmlFor="sinf">Infantry (Pure Support + medic)</label>
            <input
              className="allies-radio"
              type="radio"
              id="bradleys"
              name="unit"
              value="bradleys"
            />
            <label htmlFor="bradleys">Bradleys/Bison (Tanks Anti-Air)</label>
            <input
              className="allies-radio"
              type="radio"
              id="himar"
              name="unit"
              value="himar"
            />
            <label htmlFor="himar">Humvees/Himars (Jeeps Anti-Infantry)</label>
            <input
              className="allies-radio"
              type="radio"
              id="stryker"
              name="unit"
              value="stryker"
            />
            <label htmlFor="stryker">Humvees/Strykers (Jeeps Anti-Infantry)</label>
            <input
              className="allies-radio"
              type="radio"
              id="abrams"
              name="unit"
              value="abrams"
            />
            <label htmlFor="abrams">Abrams/Bison (Tanks Anti-tank)</label>
            <input
              className="allies-radio"
              type="radio"
              id="abramamx"
              name="unit"
              value="abramamx"
            />
            <label htmlFor="abramamx">Abram/AMX/Bison (Tanks Anti-tank)</label>
            <input
              className="allies-radio"
              type="radio"
              id="amx"
              name="unit"
              value="amx"
            />
            <label htmlFor="amx">AMX/Bison (cheaper Tanks Anti-tank)</label>
            Funds:
            <input
              type="text"
              name="funds"
              id="funds"
              value={funds}
              onChange={event => setFunds(event.target.value)}
            />
          </form>
          <button className="button allies" type="submit" form="frm1">
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
            Natty_Boh know about any issues. Thanks to jorn for providing build ratios!{" "}
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
      <AlliesPage location={props.location} data={data} {...props} />
    )}
  />
)
