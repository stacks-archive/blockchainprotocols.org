'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'
import {getSupply} from '../utils/supply'

class MarketCapChart extends Component {
  static propTypes: {
    years: PropTypes.number.isRequired,
    chartHeight: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
      loaded: false,
      options: {
        title: '',
        hAxis: {
          title: 'Years',
          minValue: 0,
          maxValue: this.props.years
        },
        vAxis: {
          title: 'fully-diluted market cap',
          minValue: 0,
          format: '$#,###M'
        },
        seriesType: 'line',
        legend: {
          position: 'top',
          maxLines: 2,
        },
        chartArea: {
          left: '15%',
          top: '15%',
          width:'75%',
          height:'75%'
        },
        colors: ['#F44336', '#4CAF50', '#03A9F4', '#673AB7', '#FFC107', '#3F51B5'],
      },
      data: null,
    }
    this.rebuildChartData = this.rebuildChartData.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  componentDidMount() {
    this.rebuildChartData()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentDidUpdate(prevProps, /*prevState*/) {
    if (prevProps.years !== this.props.years) {
      this.rebuildChartData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  rebuildChartData() {
    const years = this.props.years

    let data = [
      ['Years', 'Filecoin Advisor', 'Filecoin Main', 'Tezos', 'Blockstack'],
    ]
    const currencies = ['filecoin-advisor', 'filecoin-main', 'tezos', 'blockstack']

    let endSupplies = {}
    currencies.forEach((currency) => {
      const currencyName = currency.split('-')[0]
      const endSupply = getSupply(currencyName, years).total
      endSupplies[currencyName] = endSupply
    })

    const prices = {
      'filecoin-advisor': 0.6375,
      'filecoin-main': 2.2525,
      blockstack: 0.10,
      tezos: 0.50
    }

    for (let i = 0; i <= years; i++) {
      let row = [i]
      currencies.forEach((currency) => {
        const currencyName = currency.split('-')[0]
        const currentSupply = getSupply(currencyName, i).total
        const price = prices[currency]
        const marketCap = currentSupply * price / Math.pow(10, 6)
        row.push(marketCap)
      })
      data.push(row)
    }
    
    let options = this.state.options
    options.title = 'Fully-diluted market cap (sale price * tokens existing in a given year)'
    options.hAxis.maxValue = years
    this.setState({
      loaded: true,
      data: data,
      options: options
    })
  }

  updateDimensions() {
    this.setState({
      width: $('#market-cap-chart-panel').width(), 
      height: $('#market-cap-chart-panel').height(),
    })
  }

  render() {
    return (
      <div id="market-cap-chart-panel" className="chart-panel">
        {this.state.data ?
        <Chart
          chartType="ComboChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="market-cap-chart"
          width={'100%'}
          height={this.props.chartHeight}
          legend_toggle
        />
        : null }
      </div>
    )
  }

}

export default MarketCapChart