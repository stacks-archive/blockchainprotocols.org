'use strict'

import React         from 'react'
import {Link}        from 'react-router'
import DocumentTitle from 'react-document-title'
import Header        from '../components/Header'

const propTypes = {
  currentUser: React.PropTypes.object
}

class HomePage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DocumentTitle title="Home">
        <div>
          <div className="container-fluid col-centered bg-inverse block">
            <Header />
          </div>
          <div className="container-fluid">
            <section className="home-page chart-section">
              <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                </div>
              </div>
            </section>
          </div>
        </div>
      </DocumentTitle>
    )
  }

}

HomePage.propTypes = propTypes

export default HomePage