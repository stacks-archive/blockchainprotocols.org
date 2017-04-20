'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import YearSlider from '../components/YearSlider'
import {getSupply, getPrice, currencyNames} from '../utils/markets'

class MarketsPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      currencies: [],
      years: 8,
    }

    this.recalculate = this.recalculate.bind(this)
    this.onSliderChange = this.onSliderChange.bind(this)
  }

  componentDidMount() {
    this.recalculate()
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.years !== nextState.years) {
      this.recalculate()
    }
  }

  recalculate() {
    let currencies = []

    currencyNames.map((currencyName) => {
      const price = getPrice(currencyName)
      const supply = getSupply(currencyName, this.state.years)
      const coinsInAHundredMillionth = supply / (100 * Math.pow(10, 6))

      const currency = {
        name: currencyName,
        price: price,
        supply: supply,
        coinsInAHundredMillionth: coinsInAHundredMillionth,
        priceForAHundredMillionth: (coinsInAHundredMillionth * price)
      }
      currencies.push(currency)
    })

    this.setState({
      currencies: currencies
    })
  }

  onSliderChange(years) {
    this.setState({ years: years })
  }

  render() {
    return (
      <DocumentTitle title="Blockchain Markets">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 home-main">
                <h2>Markets</h2>

                <form className="form m-b-3">
                  <YearSlider
                    years={this.state.years}
                    maxYears={100}
                    onChange={this.onSliderChange} />
                </form>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Currency</th>
                      <th>Supply after {this.state.years} years</th>
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
                          <td>{+currency.supply.toFixed(2)}</td>
                          <td>{+currency.coinsInAHundredMillionth.toFixed(6)}</td>
                          <td>${currency.price.toFixed(2)}</td>
                          <td>${currency.priceForAHundredMillionth.toFixed(2)}</td>
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

        'supplyAfter8Years': 15750000,
        'supplyAfter20Years': 20343750,
        'supplyAfter40Years': 20979492,

        'supplyAfter8Years': 168000000,
        'supplyAfter20Years': 312000000,
        'supplyAfter40Years': 552000000,
*/