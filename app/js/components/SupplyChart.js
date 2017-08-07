'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'

import {getSupply} from '../utils/supply'

class SupplyChart extends Component {
  static propTypes: {
    years: PropTypes.number.isRequired,
    supplyFunction: PropTypes.func.isRequired,
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
          title: '% of end supply',
          minValue: 0,
          maxValue: 1,
          format: 'percent'
        },
        seriesType: 'line',
        legend: 'top',
        chartArea: {
          left: '15%',
          top: '15%',
          width:'75%',
          height:'75%'
        }
      },
      data: null,
      supplyFunction: this.props.supplyFunction
    }
    this.rebuildChartData = this.rebuildChartData.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  componentDidMount() {
    this.rebuildChartData()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentDidUpdate(prevProps, /*prevState*/) {
    if (prevProps.years !== this.props.years ||
        prevProps.supplyFunction !== this.props.supplyFunction) {
      this.rebuildChartData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  rebuildChartData() {
    const years = this.props.years
    const customSupplyFunction = this.props.supplyFunction

    let data = [
      ['Years', 'Bitcoin & Zcash', 'Ethereum', 'Filecoin'],
    ]
    const currencies = ['bitcoin', 'ethereum', 'filecoin']

    let endSupplies = {}
    currencies.forEach((currency) => {
      const endSupply = currency === 'custom' ? customSupplyFunction(years).total : getSupply(currency, years).total
      endSupplies[currency] = endSupply
    })

    for (let i = 0; i <= years; i++) {
      let row = [i]
      currencies.forEach((currency) => {
        const currentSupply = currency === 'custom' ? customSupplyFunction(i).total : getSupply(currency, i).total
        const percentage = currentSupply / endSupplies[currency]
        row.push(percentage)
      })
      data.push(row)
    }
    
    let options = this.state.options
    options.title = `Current Supply vs. Supply After ${years} Years`
    options.hAxis.maxValue = years
    this.setState({
      loaded: true,
      data: data,
      options: options
    })
  }

  updateDimensions() {
    this.setState({
      width: $('#supply-chart-panel').width(), 
      height: $('#supply-chart-panel').height(),
    })
  }

  render() {
    return (
      <div id="supply-chart-panel">
        {this.state.data ?
        <Chart
          chartType="ComboChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="supply-chart"
          width={'100%'}
          height={this.props.chartHeight}
          legend_toggle
        />
        : null }
      </div>
    )
  }

}

export default SupplyChart