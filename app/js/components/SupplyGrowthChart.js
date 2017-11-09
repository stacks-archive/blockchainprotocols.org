'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'

import {getSupply} from '../utils/supply'

class SupplyGrowthChart extends Component {
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
        title: 'Annual Supply Growth',
        hAxis: {
          title: 'Years',
          minValue: 0,
          maxValue: this.props.years
        },
        vAxis: {
          title: '% growth',
          minValue: 0,
          maxValue: 1.0,
          format: 'percent',
          viewWindow: {
            min: 0,
            max: 0.35
          }
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
      ['Years', 'Bitcoin & Zcash', 'Ethereum', 'Filecoin', 'Blockstack'],
    ]
    const currencies = ['bitcoin', 'ethereum', 'filecoin', 'blockstack']

    for (let i = 0; i <= years; i++) {
      let row = [i]
      currencies.forEach((currency) => {
        const thisYearsSupply = getSupply(currency, i).total
        const nextYearsSupply = getSupply(currency, i+1).total
        const supplyGrowth = (nextYearsSupply - thisYearsSupply) / thisYearsSupply
        row.push(supplyGrowth)
      })
      data.push(row)
    }
    let options = this.state.options
    options.hAxis.maxValue = years
    this.setState({
      loaded: true,
      data: data,
      options: options
    })
  }

  updateDimensions() {
    this.setState({
      width: $('#inflation-chart-panel').width(), 
      height: $('#inflation-chart-panel').height(),
    })
  }

  render() {
    return (
      <div id="inflation-chart-panel" className="chart-panel">
        {this.state.data ?
        <Chart
          chartType="ComboChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="inflation-chart"
          width={'100%'}
          height={this.props.chartHeight}
          legend_toggle
        />
        : null }
      </div>
    )
  }

}

export default SupplyGrowthChart