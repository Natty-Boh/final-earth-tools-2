import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import "../utils/normalize.css"
import "../utils/css/screen.css"
const Tools = () => {
  return (
    <Layout title="Tools">
      <article className="page-content page-template no-image">
        <div>
          <a href="https://chrome.google.com/webstore/detail/final-earth-link/kijafjbfabhfgooloehgajdebmfanlfk">
            Final Earth Link
          </a>{" "}
          by Pyrit[29406]
          <p className="tool-desc">
            A Google Chrome Extension that offers desktop notifications for War
            timer, Training queue, etc (recommended over script if browser
            supports it)
          </p>
        </div>

        <div>
          <a href="https://greasyfork.org/en/scripts/419411-final-earth-notifier">
            Final Earth Notifier
          </a>{" "}
          by Natty_Boh[29066]
          <p className="tool-desc">
            A TamperMonkey Script that offers desktop notifications for War
            timer, Training queue, etc (for non-Chrome users)
          </p>
        </div>

        <div>
          <a href="https://monitorfe.com/">Monitor</a> by Atr[3384]
          <p className="tool-desc">
            Track your statistics and other data as the round progresses and
            compare with others.
          </p>
        </div>

        <div>
          <a href="https://www.finalearth.com/discord">
            SkynetV2 Discord Bot Notifications
          </a>{" "}
          by Natty_Boh[29066] and Pyrit[29406]
          <p className="tool-desc">
            Join the official Final Earth Discord server and DM the SkynetV2 bot
            /start to set up timer/troop movement notifications. Bot will DM you
            the notifications. Good for users who want notifications on mobile
            too.
          </p>
        </div>

        <div>
          <a href="https://greasyfork.org/en/scripts/443645-final-earth-qol-tweaks">
            Final Earth QOL Tweaks
          </a>{" "}
          by Natty_Boh[29066]
          <p className="tool-desc">
            Tampermonkey script for various UI quality of life improvements,
            including overwriting ugly Axis font, quick buttons, and more.
          </p>
        </div>
      </article>
    </Layout>
  )
}

const toolsQuery = graphql`
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
    query={toolsQuery}
    render={data => <Tools location={props.location} data={data} {...props} />}
  />
)
