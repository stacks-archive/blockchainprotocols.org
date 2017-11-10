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
        vAxis: {
          title: 'price',
          minValue: 0,
          format: '$#,###',
          ticks: [50*1000, 100*1000, 150*1000, 200*1000, 250*1000, 300*1000, 350*1000, 400*1000, 450*1000]
        },
        seriesType: 'bars',
        legend: {
          position: 'none',
        },
        chartArea: {
          left: '15%',
          top: '15%',
          width:'75%',
          height:'75%'
        }
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

    const prices = {
      'zcash': 250,
      'filecoin-advisor': 0.6375,
      'filecoin-main': 2.2525,
      'blockstack-10': 0.10,
      'blockstack-20': 0.20,
      'tezos-staking': 0.4116,
      'tezos-nostaking': 0.4116,
    }

    const currencyLabels = [
      'zcash',
      'filecoin-advisor',
      'filecoin-main',
      'blockstack-10',
      'blockstack-20',
      'tezos-staking',
      'tezos-nostaking',
    ]

    let endSupplies = {}
    currencyLabels.forEach(currencyLabel => {
      const currencyName = currencyLabel.split('-')[0]
      let endSupply = getSupply(currencyName, years).total
      endSupplies[currencyLabel] = endSupply
    })
    endSupplies['tezos-staking'] = getSupply('tezos', years).initial

    let basisPointPrice = {}
    currencyLabels.forEach(currencyLabel => {
      const currencyName = currencyLabel.split('-')[0]
      const marketCap = endSupplies[currencyLabel] * prices[currencyLabel]
      basisPointPrice[currencyLabel] = marketCap / Math.pow(10, 4)
    })

    let data = [
      ['Currency', 'Basis Point Price', { role: 'style' }],
      ['Zcash (current price)', basisPointPrice['zcash'], '#FFD33D'],
      ['Filecoin (first hour)', basisPointPrice['filecoin-main'], '#004B7A'],
      ['Filecoin (advisor sale)', basisPointPrice['filecoin-advisor'], '#004B7A'],
      ['Tezos (no staking)', basisPointPrice['tezos-nostaking'], '#989898'],
      ['Blockstack (@ $0.10)', basisPointPrice['blockstack-10'], '#270F34'],
      ['Tezos (staking)', basisPointPrice['tezos-staking'], '#989898'],
    ]

    let options = this.state.options
    options.title = `Price per basis point at ${years}-year supply`
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