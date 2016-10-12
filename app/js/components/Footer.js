'use strict';

import React from 'react'

class Footer extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <footer>
        <div className="container-fluid base-foot">
            <p className="base-push-left">
              Charts by Ricardo Casatta, site by Ryan Shea.
            </p>
        </div>
      </footer>
    )
  }

}

export default Footer