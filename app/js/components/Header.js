'use strict';

import {Component} from 'react'
import {Link} from 'react-router'

class Header extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light
                      fixed-top navbar-inverse bg-inverse">
        <Link className="navbar-brand" to="/">
          Blockchain Protocols
        </Link>
        <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/bitcoin" className="nav-link">
              Bitcoin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ethereum" className="nav-link">
              Ethereum
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
        </div>
      </nav>
    )
  }

}

export default Header