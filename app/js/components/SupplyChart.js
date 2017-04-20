'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'

import {getChartOptions} from '../utils/charts'
import {getSupply} from '../utils/markets'

class SupplyChart extends Component {
  static propTypes: {
    years: PropTypes.number.isRequired
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
          maxValue: 100
        },
        seriesType: 'line',
        legend: true,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.years !== this.props.years) {
      this.rebuildChartData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  rebuildChartData() {
    let data = [
      ['Years', 'Bitcoin %', 'Ethereum %'],
    ]
    const endBitcoinSupply = getSupply('bitcoin', this.props.years)
    const endEtherSupply = getSupply('ethereum', this.props.years)
    const endZcashSupply = getSupply('zcash', this.props.years)

    for (let i = 0; i <= this.props.years; i++) {
      const bitcoinPercentage = getSupply('bitcoin', i) / endBitcoinSupply * 100
      const etherPercentage = getSupply('ethereum', i) / endEtherSupply * 100
      const zcashPercentage = getSupply('zcash', i) / endZcashSupply * 100
      const row = [i, bitcoinPercentage, etherPercentage]
      data.push(row)
    }
    let options = this.state.options
    options.title = `Supply as a % of End Supply After ${this.props.years} Years`
    this.setState({
      loaded: true,
      data: data,
      options: options
    })
  }

  updateDimensions() {
    this.setState({
      width: $('#chart-panel').width(), 
      height: $('#chart-panel').height(),
    })
  }

  render() {
    return (
      <div id="chart-panel">
        {this.state.data ?
        <Chart
          chartType="ComboChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="total_div"
          width={'100%'}
          height={'800px'}
          legend_toggle
        />
        : null }
      </div>
    )
  }

}

export default SupplyChart