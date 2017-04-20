'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import DocumentTitle from 'react-document-title'
import CardLink         from '../components/CardLink'

class HomePage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DocumentTitle title="Blockchain Protocols">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 home-main">
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

export default HomePage

/*
                    <CardLink href="/markets"
                      title="Markets"
                      body="Data on the markets of various cryptocurrencies"
                      imageSrc="../../images/price-chart.png" />
*/