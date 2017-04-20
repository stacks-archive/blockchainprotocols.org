'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import Header        from '../components/Header'

class MarketsPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      currencies: []
    }
  }

  componentWillMount() {
    const aHundredMillion = 100000000
    let currencies = [
      {
        "name": "Bitcoin",
        "supplyAfter8Years": 15750000,
        "supplyAfter20Years": 20343750,
        "supplyAfter40Years": 20979492,
        "price": 1211.13
      },
      {
        "name": "Ethereum",
        "supplyAfter8Years": 168000000,
        "supplyAfter20Years": 312000000,
        "supplyAfter40Years": 552000000,
        price: 48.8343
      },
    ]

    currencies.map((currency) => {
      currency.coinsInAHundredMillionth = currency.supplyAfter8Years / aHundredMillion
      currency.priceForAHundredMillionth = currency.coinsInAHundredMillionth * currency.price
    })
    this.setState({
      currencies: currencies
    })

  }

  render() {
    return (
      <DocumentTitle title="Blockchain Markets">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 home-main">
                <h2>Markets</h2>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Currency</th>
                      <th>Coins after 8 years</th>
                      <th>Coins in 1/100M</th>
                      <th>Price per coin</th>
                      <th>Price for 1/100M</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.currencies.map((currency, index) => {
                      return (
                        <tr key={index}>
                          <td>{currency.name}</td>
                          <td>{currency.supplyAfter8Years}</td>
                          <td>{currency.coinsInAHundredMillionth}</td>
                          <td>${currency.price}</td>
                          <td>${currency.priceForAHundredMillionth}</td>
                        </tr>
                      )
                    }) }
                  </tbody>
                </table>

              </div>
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }

}

export default MarketsPage

/*

    const url = "https://api.coinmarketcap.com/v1/ticker/?limit=10"
    fetch(url)
    .then((response) => response.text())
    .then((responseText) => JSON.parse(responseText))
    .then((responseJSON) => {
      console.log(responseJSON)

*/