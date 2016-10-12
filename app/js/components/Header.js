'use strict';

import React from 'react';
import {Link} from 'react-router'

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid col-centered bg-inverse block navbar-fixed-top">
        <header className="container-fluid no-padding nav-header">
          <nav className="navbar navbar-dark">
            <div>
              <Link className="navbar-brand" to="/">
                <span className="brand-title">
                  Blockchain Protocols
                </span>
              </Link>
              <ul className="nav navbar-nav">
                <li className="nav-item">
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }

}

export default Header;