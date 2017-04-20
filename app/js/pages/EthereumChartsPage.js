'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

class NotFoundPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DocumentTitle title="Ethereum Charts Coming Soon">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2 home-main">
                <h2>Ethereum Charts Coming Soon</h2>
              </div>
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }

}

export default NotFoundPage