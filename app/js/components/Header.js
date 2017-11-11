'use strict';

import {Component} from 'react'
import {Link} from 'react-router'

class Header extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{ paddingTop: '40px' }}>
        <h2 style={{ textAlign: 'center' }}>
          Blockstack Charts
        </h2>
      </div>
    )
  }

}

export default Header