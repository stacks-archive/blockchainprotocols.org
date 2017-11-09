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
        title: 'Stakeholder Ownership',
        hAxis: {
          title: 'Years',
          minValue: 1,
          maxValue: this.props.years,
        },
        vAxis: {
          title: '% of distribution'
        },
        seriesType: 'area',
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
    if (prevProps.years !== this.props.years) {
      this.rebuildChartData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  rebuildChartData() {
    const supplyObject = getSupply('blockstack', 2)
    const totalAmount = supplyObject.total

    let data = [
      ['Group', 'Amount'],
      ['Miners', supplyObject.miners],
      ['Apps', supplyObject.apps],
      ['User Sale', supplyObject.userSale],
      ['User Rewards', supplyObject.userMining],
      ['Accredited Sale', supplyObject.sale],
      ['Creators', supplyObject.creators],
    ]

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