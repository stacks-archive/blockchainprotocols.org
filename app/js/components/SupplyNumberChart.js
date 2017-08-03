'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'

import {getSupply} from '../utils/supply'

class SupplyNumberChart extends Component {
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
          title: '# of tokens',
          format: '#,###M'
        },
        seriesType: 'area',
        legend: 'top',
        isStacked: true,
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
      ['Years', 'Miners', 'Sale', 'Founders'],
    ]

    for (let i = 0; i <= years; i++) {
      const supplyObject = customSupplyFunction(i)
      const row = [
        i,
        supplyObject.miners/Math.pow(10, 6),
        supplyObject.sale/Math.pow(10, 6),
        supplyObject.founders/Math.pow(10, 6),
      ]
      data.push(row)
    }
    let options = this.state.options
    options.title = `Current Supply`
    options.hAxis.maxValue = years
    this.setState({
      loaded: true,
      data: data,
      options: options
    })
  }

  updateDimensions() {
    this.setState({
      width: $('#supply-number-chart-panel').width(), 
      height: $('#supply-number-chart-panel').height(),
    })
  }

  render() {
    return (
      <div id="supply-number-chart-panel">
        {this.state.data ?
        <Chart
          chartType="ComboChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="supply-number-chart"
          width={'100%'}
          height={this.props.chartHeight}
          legend_toggle
        />
        : null }
      </div>
    )
  }

}

export default SupplyNumberChart

