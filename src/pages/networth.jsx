import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const NetworthPage = () => {
  const [key, setKey] = React.useState("")
  const [networth, setNetworth] = React.useState("")
  const [fetching, setFetching] = React.useState(false)

  async function calculateNetworth() {
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
              allUnits.data.find(elem => unit.id === elem.id).cost *
              unit.quantity
          )
          .reduce((a, b) => a + b, 0)

        const funds = userJson.data.funds
        const reimb = userJson.data.reimbursement.amount
        setNetworth(numberWithCommas(unitNet + funds + reimb))
      } else {
        setNetworth(
          `Something went wrong! The API returned an error: ${unitsJson.reason}`
        )
      }
    } catch (error) {
      setNetworth(
        `Something went wrong! Encountered an error when trying to contact the API: ${error.message}`
      )
    }
  }

  function numberWithCommas(x) {
    if (x !== "") {
      return " Networth: $" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return ""
  }

  return (
    <Layout title="Networth Calculator">
      <article className="page-content page-template no-image">
        <div className="post-content-body">
          <p className="calculator-intro">
            Enter your FE api key to see your total networth (units value + cash
            on hand + reimbursement value). After clicking submit it may take a
            couple of seconds for the request to complete and show your
            networth.
          </p>

          <form
            id="frm1"
            onSubmit={event => {
              event.preventDefault()
              if (key !== "") {
                setNetworth("Waiting for api...")
                setFetching(true)
                calculateNetworth().finally(() => setFetching(false))
              }
            }}
          >
            <label htmlFor="key">API key:</label>
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
          </form>
          <button
            className={`button neutral`}
            type="submit"
            disabled={fetching}
            form="frm1"
          >
            Submit
          </button>

          <div className="unit-container">{networth}</div>
        </div>
        <p className="note">
          {" "}
          *Note: Sold units are not currently accessible in the api until they are added to your reimbursement 24 hours after being sold.
          Selling units will make your networth in this calculator appear to have dropped. {" "}
        </p>
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
      <NetworthPage location={props.location} data={data} {...props} />
    )}
  />
)
