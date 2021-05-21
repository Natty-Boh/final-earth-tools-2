import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"


const Layout = props => {
  const { title, children } = props
  return (
    <div className="site-wrapper">
    <Helmet>
           <title>Final Earth Tools</title>
       </Helmet>
      <header className="site-head">
        <div className="site-head-container">
          <nav id="swup" className="site-head-left">
            <ul className="nav">
              <li className="nav-home nav-current">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="nav-about">
                <Link to={`/axis`}>Axis Calculator</Link>
              </li>
              <li className="nav-elements">
                <Link to={`/allies`}>Allies Calculator</Link>
              </li>
              <li className="nav-elements">
                <Link to={`/networth`}>Networth Calculator</Link>
              </li>
            </ul>
          </nav>
          <div className="site-head-center">
            <Link className="site-head-logo" to={`/`}>
              {title}
            </Link>
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} Natty_Boh
      </footer>
    </div>
  )
}

export default Layout
