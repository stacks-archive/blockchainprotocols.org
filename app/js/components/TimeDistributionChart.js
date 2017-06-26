'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'

//import {getSupply} from '../utils/supply'

class TimeDistributionChart extends Component {
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
        title: 'Stakeholder Distribution Over Time',
        hAxis: {
          title: 'Years',
          minValue: 0,
          maxValue: 1,
          format: 'percent'
        },
        legend: { position: 'top', maxLines: 3 },
        isStacked: true,
      },
      data: null,
      chartArea: {
        left: '15%',
        top: '15%',
        width:'80%',
        height:'80%'
      }
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
    const customSupplyFunction = this.props.supplyFunction
    let data = [
      ['Years', 'Miners', 'Crowdsale', 'Creators'],
    ]

    const yearNumbers = [0, 2, 4, 6, 8, 10, 12]
    yearNumbers.forEach((years) => {
      const totalAmount = customSupplyFunction(years).total
      const saleShare = customSupplyFunction(years).sale / totalAmount
      const foundingShare = customSupplyFunction(years).founders / totalAmount
      const minerShare = customSupplyFunction(years).miners / totalAmount
      const row = [
        `${years} years`,
        minerShare,
        saleShare,
        foundingShare,
      ]
      data.push(row)
    })

    //console.log(data)
    let options = this.state.options
    this.setState({
      loaded: true,
      data: data,
      options: options
    })
  }

  updateDimensions() {
    this.setState({
      width: $('#time-distribution-chart-panel').width(), 
      height: $('#time-distribution-chart-panel').height(),
    })
  }

  render() {
    return (
      <div id="time-distribution-chart-panel">
        {this.state.data ?
        <Chart
          chartType="BarChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="time-distribution-chart"
          width={'100%'}
          height={this.props.chartHeight}
          legend_toggle
        />
        : null }
      </div>
    )
  }

}

export default TimeDistributionChart