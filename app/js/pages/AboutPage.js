'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import {Link} from 'react-router'

class AboutPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DocumentTitle title="Page Not Found">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 offset-md-4 home-main">
                <h2>About</h2>
                <p>
                  This site was created by <Link to="">Ryan Shea</Link> and <Link to="">Ricardo Casatta</Link>.
                </p>
                <p>
                  The Bitcoin charts on this site were created using <Link to="http://coinsecrets.org">coinsecrets.org</Link>, <Link to="http://blockr.io">blockr.io</Link> and <Link to="http://coinmarketcap.com">coinmarketcap.com</Link>. Ethereum charts are coming soon.
                </p>
                <p>
                  To suggest changes, submit a pull request or create an issue on <Link to="https://github.com/blockstack/blockchainprotocols.org/issues">GitHub</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }

}

export default AboutPage