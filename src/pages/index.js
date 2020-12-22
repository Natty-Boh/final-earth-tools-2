import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import "../utils/normalize.css"
import "../utils/css/screen.css"
const Index = ({ data }, location) => {

  return (
    <Layout title="Final Earth Tools">
     
      
        <header className="page-head">
          <h2 className="page-head-title">
            Final Earth Build Calculators
          </h2>
          {"\n"}
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
        </header>
      
      
     
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
  render={data => (
    <Index location={props.location} data={data} {...props} />
  )}
/>
)
