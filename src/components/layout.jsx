import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"

const Layout = props => {
  const { title, children } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <Helmet>
        <title>Final Earth Tools</title>
      </Helmet>
      <header className="site-head">
        <div className="site-head-container">
          <a
            className="nav-burger"
            href={`#`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          <nav id="swup" class="site-head-left">
            <ul className="nav">
              <li className="nav-elements">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="nav-elements">
                <Link to={`/axis`}>Axis Calculator</Link>
              </li>
              <li className="nav-elements">
                <Link to={`/allies`}>Allies Calculator</Link>
              </li>
              <li className="nav-elements">
                <Link to={`/networth`}>Networth </Link>
              </li>
              <li className="nav-elements">
                <Link to={`/tools`}>Tools</Link>
              </li>
            </ul>
          </nav>
          <div className="site-head-center">
            <Link className="site-head-logo" to={`/`}>
              {title}
            </Link>
          </div>
          <div className="site-head-right"></div>
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
