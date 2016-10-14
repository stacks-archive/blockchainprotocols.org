'use strict'

import React         from 'react'
import {Link} from 'react-router'
import DocumentTitle from 'react-document-title'
import Header        from '../components/Header'
import CardLink         from '../components/CardLink'

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
          <Header />

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-sm-12 home-main">
                <div className="card-deck-wrapper">
                  <div className="card-deck m-b-3">
                    <CardLink href="/bitcoin"
                      title="Bitcoin Protocols"
                      body="Statistics on protocols embedding raw data in the Bitcoin blockchain. In particular, these protocols use a data field known as OP_RETURN."
                      imageSrc="../../images/bitcoin-1024.png" />
                    <CardLink href="/ethereum"
                      title="Ethereum Protocols"
                      body="COMING SOON: Statistics on protocols operating on the Ethereum blockchain."
                      imageSrc="../../images/ethereum-650.jpg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }

}

HomePage.propTypes = propTypes

export default HomePage