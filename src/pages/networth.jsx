import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const NetworthPage = () => {
  const [key, setKey] = React.useState("")
  const [networth, setNetworth] = React.useState("")

  async function calculateNetworth() {
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

    if (!unitsJson.data.code == 1) {
      var unitNet = unitsJson.data
        .map(unit => allUnits.data[unit.id - 1].cost * unit.quantity)
        .reduce((a, b) => a + b, 0)

      var funds = userJson.data.funds
      var reimb = userJson.data.reimbursement.amount
      setNetworth(numberWithCommas(unitNet + funds + reimb))
    } else {
      setNetworth(
        "Something went Wrong! You may have used an invalid API key or the Final Earth API failed."
      )
    }
  }

  function numberWithCommas(x) {
    if (x != "") {
      return " Networth: $" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return ""
  }

  return (
    <Layout title="Networth Calculator">
      <article className="post-content page-template no-image">
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
              if (key != "") {
                calculateNetworth()
              }
            }}
          ></form>
          <label htmlFor="key">API key:</label>
          <input
            type="text"
            name="key"
            id="key"
            value={key}
            onChange={event => {
              setKey(event.target.value)
            }}
          />
          <button className={`button allies`} type="submit" form="frm1">
            Submit
          </button>

          <div className="unit-container">{networth}</div>
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
      <NetworthPage location={props.location} data={data} {...props} />
    )}
  />
)
