import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import "../utils/normalize.css"
import "../utils/css/screen.css"
const Index = () => {
  return (
    <Layout title="Final Earth Tools">
      <article className="page-head">
        <p>Final Earth Tools is a collection of player created calculators, tools and resources for the browser war game, <a href="https://www.finalearth.com/">Final Earth</a>.</p>
        <h2 className="page-head-title">Build Calculators</h2>
        <br/>
        <p>Select your team:</p>
        <ul className="actions post-content">
          <li>
            <a href="/axis" className="button axis">
              Axis
            </a>
          </li>
          <li>
            <a href="/allies" className="button allies">
              Allies
            </a>
          </li>
        </ul>
        <h2 className="page-head-sub-title">Other Calculators</h2>
        <br />
          <a href="/networth" className="button neutral">
            Networth
          </a>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => <Index location={props.location} data={data} {...props} />}
  />
)
