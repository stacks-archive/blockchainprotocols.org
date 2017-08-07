'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import YearSlider from '../components/YearSlider'
import {fetchPrices, currencyNames} from '../utils/markets'
import {getSupply} from '../utils/supply'

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

    fetchPrices().then(prices => {
      currencyNames.map((currencyName) => {
        const price = parseFloat(prices[currencyName.toLowerCase()].price_usd)
        const supply = getSupply(currencyName, this.state.years).total
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

                <form className="form m-t-30 m-b-50">
                  <YearSlider
                    years={this.state.years}
                    maxYears={100}
                    onChange={this.onSliderChange} />
                </form>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Price per coin</th>
                      <th>Supply after {this.state.years} years</th>
                      <th>Coins in 1/100M</th>
                      <th>Price for 1/100M</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.currencies.map((currency, index) => {
                      return (
                        <tr key={index}>
                          <td>{currency.name}</td>
                          <td>${currency.price.toFixed(2)}</td>
                          <td>{+currency.supply.toFixed(0)}</td>
                          <td>{+currency.coinsInAHundredMillionth.toFixed(4)}</td>
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