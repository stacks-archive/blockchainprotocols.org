'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'
import {getSupply} from '../utils/supply'

class PieOwnershipChart extends Component {
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
          minValue: 1,
          maxValue: this.props.years,
        },
        vAxis: {
          title: '% of distribution'
        },
        legend: {
          position: 'top',
          maxLines: 2,
        },
        isStacked: true,
        chartArea: {
          left: '15%',
          top: '15%',
          width:'75%',
          height:'75%'
        },
        colors: ['#F44336', '#673AB7', '#4CAF50', '#03A9F4', '#FFC107', '#3F51B5'],
      },
      data: null
    }
    //        colors: ['#009688', '#4CAF50', '#03A9F4', '#00BCD4', '#673AB7', '#3F51B5'],
    //        colors: ['#8D7DD5', '#AB76D2', '#01CF98', '#2C96FF', '#96CAFF', '#F53E99']
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
    const supplyObject = getSupply('blockstack', this.props.years)

    let data = [
      ['Group', 'Amount', {role:'style'}],
      ['Miners', supplyObject.miners, '#270F34'],
      ['Apps', supplyObject.apps, '#FE7F2D'],
      ['User Rewards', supplyObject.userMining, '#FE7F2D'],
      ['User Sale', supplyObject.userSale, '#FE7F2D'],
      ['Accredited Sale', supplyObject.sale, '#FE7F2D'],
      ['Creators', supplyObject.creators, '#FE7F2D'],
    ]

    let options = this.state.options
    options.hAxis.maxValue = this.props.years
    options.title = `Blockstack stakeholder ownership after ${this.props.years} years`,
    this.setState({
      loaded: true,
      data: data,
      options: options
    })
  }

  updateDimensions() {
    this.setState({
      width: $('#pie-ownership-chart-panel').width(), 
      height: $('#pie-ownership-chart-panel').height(),
    })
  }

  render() {
    return (
      <div id="pie-ownership-chart-panel" className="chart-panel">
        {this.state.data ?
        <Chart
          chartType="PieChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="pie-ownership-chart"
          width={'100%'}
          height={this.props.chartHeight}
          legend_toggle
        />
        : null }
      </div>
    )
  }

}

export default PieOwnershipChart