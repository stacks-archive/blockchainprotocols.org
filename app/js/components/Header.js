'use strict';

import {Component} from 'react'
import {Link} from 'react-router'

class Header extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center', paddingTop: '30px', paddingBottom: '30px' }}>
          The Blockchain Internet
        </h2>
      </div>
    )
  }

}

export default Header