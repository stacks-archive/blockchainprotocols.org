'use strict';

import {Component} from 'react'
import {Link} from 'react-router'

class Header extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="container-fluid nav-header">
        <nav className="navbar navbar-light">
          <Link className="navbar-brand" to="/">
            <span className="brand-title">
              Blockchain Protocols
            </span>
          </Link>
          <ul className="nav navbar-nav pull-right">
            <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }

}

export default Header