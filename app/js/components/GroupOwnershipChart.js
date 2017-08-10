'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'

import {getSupply} from '../utils/supply'

class FoundingShareChart extends Component {
  static propTypes: {
    id: PropTypes.string.isRequired,
    years: PropTypes.number.isRequired,
    supplyFunction: PropTypes.func.isRequired,
    chartHeight: PropTypes.number.isRequired,
    group: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
      loaded: false,
      options: {
        title: 'Ownership Over Time',
        hAxis: {
          title: 'Years',
          minValue: 0,
          maxValue: this.props.years
        },
        vAxis: {
          title: '% owned',
          minValue: 0,
          maxValue: 1.0,
          format: 'percent',
          viewWindow: {
            min: 0,
            max: 1.0
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
    if (prevProps.years !== this.props.years ||
        prevProps.supplyFunction !== this.props.supplyFunction) {
      this.rebuildChartData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  rebuildChartData() {
    let options = this.state.options
    options.hAxis.maxValue = years

    const years = this.props.years
    const customSupplyFunction = this.props.supplyFunction

    let data = [
      ['Years', 'Bitcoin', 'Ethereum', 'Filecoin', 'Tezos', 'Zcash',],
    ]
    const currencies = ['bitcoin', 'ethereum', 'filecoin', 'tezos', 'zcash',]

    for (let i = 0; i <= years; i++) {
      let row = [i]
      currencies.forEach((currency) => {
        const totalAmount = currency !== 'custom' ? getSupply(currency, i).total : customSupplyFunction(i).total

        switch (this.props.group) {
          case 'creators':
            options.title = 'Creator Ownership Over Time'
            options.vAxis.title = '% owned by creators + foundation'
            const creatorAmount = currency !== 'custom' ? getSupply(currency, i).creators : customSupplyFunction(i).creators
            const creatorPercentage = creatorAmount / totalAmount
            row.push(creatorPercentage)
            break
          case 'sale':
            options.title = 'Buyer Ownership Over Time'
            options.vAxis.title = '% owned by sale participants'
            const saleAmount = currency !== 'custom' ? getSupply(currency, i).sale : customSupplyFunction(i).sale
            const salePercentage = saleAmount / totalAmount
            row.push(salePercentage)
            break
          default:
            break
        }
      })
      data.push(row)
    }
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

export default FoundingShareChart