'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import {Chart} from 'react-google-charts'

import {getSupply} from '../utils/supply'

class FoundingShareChart extends Component {
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
        title: 'Creator Ownership Over Time',
        hAxis: {
          title: 'Years',
          minValue: 0,
          maxValue: this.props.years
        },
        vAxis: {
          title: '% owned by creators',
          minValue: 0,
          maxValue: 1.0,
          format: 'percent',
          viewWindow: {
            min: 0,
            max: 0.5
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
    const years = this.props.years
    const customSupplyFunction = this.props.supplyFunction

    let data = [
      ['Years', 'Bitcoin', 'Ethereum', 'Filecoin', 'Custom', 'Zcash'],
    ]
    const currencies = ['bitcoin', 'ethereum', 'filecoin', 'custom', 'zcash']

    for (let i = 0; i <= years; i++) {
      let row = [i]
      currencies.forEach((currency) => {
        const creatorPercentage = currency !== 'custom' ? getSupply(currency, i).founderPercentage : customSupplyFunction(i).creatorPercentage
        row.push(creatorPercentage)
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
      width: $('#creator-share-chart-panel').width(), 
      height: $('#creator-share-chart-panel').height(),
    })
  }

  render() {
    return (
      <div id="creator-share-chart-panel">
        {this.state.data ?
        <Chart
          chartType="ComboChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="creator-share-chart"
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