'use strict';

import React from 'react';
import {Link} from 'react-router'

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="container-fluid no-padding nav-header">
        <nav className="navbar">
          <div>
            <Link className="navbar-brand" to="/">
              <span className="brand-title">
                Blockstack Stats
              </span>
            </Link>
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link to="https://blockstack.org" target="_blank" className="nav-link">
                  More at blockstack.org
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

}

export default Header;