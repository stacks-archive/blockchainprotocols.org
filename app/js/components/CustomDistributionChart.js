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
          minValue: 1,
          maxValue: this.props.years,
        },
        vAxis: {
          title: '% of distribution'
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
      data: null
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
      ['Years', 'Miners', 'Apps', 'Users', 'Crowdsale', 'Giveaway', 'Creators'],
    ]

    for (let i = 1; i <= this.props.years; i++) {
      const totalAmount = customSupplyFunction(i).total
      const minerShare = customSupplyFunction(i).burners / totalAmount * 100
      const appShare = customSupplyFunction(i).apps / totalAmount * 100
      const userShare = customSupplyFunction(i).users / totalAmount * 100
      const saleShare = customSupplyFunction(i).sale / totalAmount * 100
      const giveawayShare = customSupplyFunction(i).giveaway / totalAmount * 100
      const creatorShare = customSupplyFunction(i).creators / totalAmount * 100
      const row = [
        i,
        minerShare,
        appShare,
        userShare,
        saleShare,
        giveawayShare,
        creatorShare,
      ]
      data.push(row)
    }

    //console.log(data)
    let options = this.state.options
    options.hAxis.maxValue = this.props.years
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
          chartType="ComboChart"
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