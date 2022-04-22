import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import { axisRatios, axisUnits, singleUnitAxis } from "../utils/ratios"
import BuildCalculator from "../components/build"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AxisPage = () => (
  <Layout title="Axis Build Calculator">
    <BuildCalculator
      team="axis"
      ratios={axisRatios}
      units={axisUnits}
      singleUnit={singleUnitAxis}
    />
  </Layout>
)

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
