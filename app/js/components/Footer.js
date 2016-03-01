'use strict';

import React from 'react';

class Footer extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div className="container-fluid base-foot">
            <p className="base-push-left">
              Made with &lt;3 by the Blockstack community
            </p>
        </div>
      </footer>
    );
  }

}

export default Footer;