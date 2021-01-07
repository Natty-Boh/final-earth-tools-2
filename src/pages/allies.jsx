import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import { alliesRatios, alliesUnits } from "../utils/ratios"

import BuildCalculator from "../components/build"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AlliesPage = () => (
  <Layout title="Allies Build Calculator">
    <BuildCalculator team="allies" ratios={alliesRatios} units={alliesUnits} />
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
      <AlliesPage location={props.location} data={data} {...props} />
    )}
  />
)
