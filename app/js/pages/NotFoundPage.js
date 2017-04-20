'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import Header        from '../components/Header'

class NotFoundPage extends Component {
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
              <div className="col-md-12 home-main">
                <h2>Page Not Found</h2>
              </div>
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }

}

export default NotFoundPage