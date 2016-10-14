'use strict'

import React         from 'react'
import DocumentTitle from 'react-document-title'
import Header        from '../components/Header'

const propTypes = {
  currentUser: React.PropTypes.object
}

class AboutPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DocumentTitle title="Page Not Found">
        <div>
          <Header />

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2 home-main">
                <h2>About</h2>

                <p>
                  The charts on this site were created by Ricardo Casatta (@rcasatta) using coinsecrets.org and blockr.io.
                </p>
                <p>
                  The site design and layout were put together by Ryan Shea (@ryaneshea).
                </p>
                <p>
                  To suggest changes, submit a pull request or create an issue on GitHub.
                </p>
              </div>
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }

}

AboutPage.propTypes = propTypes

export default AboutPage