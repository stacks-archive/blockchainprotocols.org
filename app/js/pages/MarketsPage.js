'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import YearSlider from '../components/YearSlider'
import {fetchCurrencies, currencyNames} from '../utils/markets'
import {getSupply} from '../utils/supply'
import MarketPriceChart from '../components/MarketPriceChart'

class MarketsPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      currencies: [],
      years: 20,
      chartHeight: '800px'
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
    fetchCurrencies().then(currencies => {
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
      <DocumentTitle title="The Blockchain Internet">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 home-main">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Asset</th>
                      <th className="text-right">Market Cap</th>
                      <th className="text-right">Price per token</th>
                      <th className="text-right">Supply after 4Y</th>
                      <th className="text-right">Price for 1/1B @ 4Y</th>
                      <th className="text-right">Supply after 20Y</th>
                      <th className="text-right">Price for 1/1B @ 20Y</th>
                      <th className="text-right">Volume (24h)</th>
                      <th className="text-right">% Change (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.currencies.map((currency, index) => {
                      const snapshot20Years = currency.snapshot20Years
                      const snapshot4Years = currency.snapshot4Years
                      return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{currency.name}</td>
                          <td className="text-right">${currency.marketCapUSD}</td>
                          <td className="text-right">${currency.price}</td>
                          <td className="text-right">{snapshot4Years.supplyFormatted}</td>
                          <td className="text-right">${snapshot4Years.priceForABillionth}</td>
                          <td className="text-right">{snapshot20Years.supplyFormatted}</td>
                          <td className="text-right">${snapshot20Years.priceForABillionth}</td>
                          <td className="text-right">${currency.volume24HoursUSD}</td>
                          <td className="text-right">{currency.percentChange24H}%</td>
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
                          <td className="text-right">{snapshot20Years.coinsInABillionth}</td>

            <div className="row">
              <div className="col-md-4">
                <form className="form m-t-30 m-b-50">
                  <YearSlider
                    years={this.state.years}
                    maxYears={100}
                    onChange={this.onSliderChange} />
                </form>
              </div>
            </div>

*/
