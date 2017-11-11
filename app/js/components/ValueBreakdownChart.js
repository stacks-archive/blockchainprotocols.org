'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'
import {getSupply} from '../utils/supply'

class ValueBreakdownChart extends Component {
  static propTypes: {
    years: PropTypes.number.isRequired,
    chartHeight: PropTypes.number.isRequired,
    blockstackPrice: PropTypes.number.isRequired,
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
          title: 'present value',
          minValue: 0,
          format: '$#,###M',
        },
        seriesType: 'bars',
        legend: {
          position: 'none',
        },
        chartArea: {
          left: '15%',
          top: '10%',
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
    if (prevProps.years !== this.props.years ||
        prevProps.blockstackPrice !== this.props.blockstackPrice) {
      this.rebuildChartData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  rebuildChartData() {
    const years = this.props.years
    const price = this.props.blockstackPrice
    const supplyObject = getSupply('blockstack', years)
    const allMinerSupply = supplyObject.miners + supplyObject.apps + supplyObject.userMining

    const totalValue = {
      accreditedSale: price * supplyObject.sale / Math.pow(10, 6),
      creators: price * supplyObject.creators / Math.pow(10, 6),
      userSale: price * supplyObject.userSale / Math.pow(10, 6),
      allMiners: price * allMinerSupply / Math.pow(10, 6),
      total: price * supplyObject.total / Math.pow(10, 6),
    }

    let data = [
      ['Group', 'Total Value'],
      ['Accredited sale', totalValue['accreditedSale']],
      ['Creators', totalValue['creators']],
      ['User sale', totalValue['userSale']],
      ['All miners', totalValue['allMiners']],
      ['All stakeholders', totalValue['total']],
    ]

    let options = this.state.options
    options.title = `Present value of all tokens available after ${years} years, assuming a $${price} price`
    this.setState({
      loaded: true,
      data: data,
      options: options
    })
  }

  updateDimensions() {
    this.setState({
      width: $('#value-breakdown-chart-panel').width(), 
      height: $('#value-breakdown-chart-panel').height(),
    })
  }

  render() {
    return (
      <div id="value-breakdown-chart-panel" className="chart-panel">
        {this.state.data ?
        <Chart
          chartType="ComboChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="value-breakdown-chart"
          width={'100%'}
          height={this.props.chartHeight}
          legend_toggle
        />
        : null }
      </div>
    )
  }

}

export default ValueBreakdownChart