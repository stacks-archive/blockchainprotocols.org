'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'
import {getSupply} from '../utils/supply'

class SupplyChart extends Component {
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
          title: '% of end supply',
          minValue: 0,
          maxValue: 1,
          format: 'percent'
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
        colors: ['#F44336', '#673AB7', '#4CAF50', '#03A9F4', '#FFC107', '#009688'],
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

    let endSupplies = {}
    currencies.forEach((currency) => {
      const endSupply = getSupply(currency, years).total
      endSupplies[currency] = endSupply
    })

    for (let i = 0; i <= years; i++) {
      let row = [i]
      currencies.forEach((currency) => {
        const currentSupply = getSupply(currency, i).total
        const percentage = currentSupply / endSupplies[currency]
        row.push(percentage)
      })
      data.push(row)
    }
    
    let options = this.state.options
    options.title = `Current supply vs supply after ${years} years`
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
      <div id="supply-chart-panel" className="chart-panel">
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