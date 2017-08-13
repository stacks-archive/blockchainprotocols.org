'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'

class MarketPriceChart extends Component {
  static propTypes: {
    id: PropTypes.string.isRequired,
    years: PropTypes.number.isRequired,
    chartHeight: PropTypes.number.isRequired,
    currencies: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
      loaded: false,
      options: {
        title: 'Price for 1/1B',
        vAxis: {
          title: 'Price in USD',
        },
        seriesType: 'bars',
        legend: 'none',
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
    if (prevProps.currencies !== this.props.currencies) {
      this.rebuildChartData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  rebuildChartData() {
    let data = [
      ['Currency', 'Price']
    ]
    this.props.currencies.map((currency) => {
      const priceForABillionth = Math.round(currency.priceForABillionth * 100) / 100
      const row = [currency.name, priceForABillionth]
      data.push(row)
    })
    let options = this.state.options
    options.title = `Price for 1/1B of All Coins In Existence (After ${this.props.years} Years)`
    this.setState({
      loaded: true,
      data: data,
      options: options
    })
  }

  updateDimensions() {
    this.setState({
      width: $(`#${this.props.id}`).width(), 
      height: $(`#${this.props.id}`).height(),
    })
  }

  render() {
    return (
      <div id={this.props.id}>
        {this.state.data ?
        <Chart
          chartType="ComboChart"
          data={this.state.data}
          options={this.state.options}
          graph_id={this.props.id}
          width={'100%'}
          height={this.props.chartHeight}
          legend_toggle
        />
        : null }
      </div>
    )
  }

}

export default MarketPriceChart

