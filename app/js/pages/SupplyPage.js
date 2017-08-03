'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import SupplyChart from '../components/SupplyChart'
import SupplyNumberChart from '../components/SupplyNumberChart'
import SupplyGrowthChart from '../components/SupplyGrowthChart'
import FoundingShareChart from '../components/FoundingShareChart'
import TimeDistributionChart from '../components/TimeDistributionChart'
import {getTokenSupplyFunction} from '../utils/supply'
import InputRange from 'react-input-range'

class SupplyPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      years: 20,
      saleSupply: 750,
      founderSupply: 250,
      miningSupplyPerYear: 330,
      miningDecayCoefficient: 0.5,
      miningDecayInterval: 4,
      numberOfMiningDecays: 2,
      salePrice: 0.1,
      chartHeight: '400px'
    }
  }

  render() {
    const parameters = {
      saleSupply: this.state.saleSupply * Math.pow(10, 6),
      founderSupply: this.state.founderSupply * Math.pow(10, 6),
      miningSupplyPerYear: this.state.miningSupplyPerYear * Math.pow(10, 6),
      miningDecayCoefficient: this.state.miningDecayCoefficient,
      miningDecayInterval: this.state.miningDecayInterval,
      numberOfMiningDecays: this.state.numberOfMiningDecays
    }
    const supplyFunction = getTokenSupplyFunction('halving', parameters)
    const amountRaised = this.state.saleSupply * this.state.salePrice * Math.pow(10, 6)

    return (
      <DocumentTitle title="Blockchain Supply">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 home-main">
                <form>
                  <div className="row">
                    <div className="col-md-2">
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Years</label>
                        <InputRange
                          minValue={0}
                          maxValue={100}
                          value={this.state.years}
                          onChange={value => this.setState({
                            years: value
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Sale Supply (millions)</label>
                        <input
                          value={this.state.saleSupply}
                          onChange={event => this.setState({
                            saleSupply: event.target.value
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Creator Supply (millions)</label>
                        <input
                          value={this.state.founderSupply}
                          onChange={event => this.setState({
                            founderSupply: event.target.value
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Mining Supply in Year 1 (millions)</label>
                        <input
                          value={this.state.miningSupplyPerYear}
                          onChange={event => this.setState({
                            miningSupplyPerYear: event.target.value
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Initial Sale Price ($)</label>
                        <input
                          value={this.state.salePrice}
                          onChange={event => this.setState({
                            salePrice: event.target.value
                          })} />
                      </div>
                      
                      <div className="m-b-40">
                        <p>
                          <b>Crowdsale Revenue:</b><br/>${ amountRaised.toLocaleString() }
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <SupplyChart
                        years={this.state.years}
                        supplyFunction={supplyFunction}
                        chartHeight={this.state.chartHeight} />
                      <SupplyGrowthChart
                        years={this.state.years}
                        supplyFunction={supplyFunction}
                        chartHeight={this.state.chartHeight} />
                      <FoundingShareChart
                        years={this.state.years}
                        supplyFunction={supplyFunction}
                        chartHeight={this.state.chartHeight} />
                    </div>
                    <div className="col-md-5">
                      <SupplyNumberChart
                        years={this.state.years}
                        supplyFunction={supplyFunction}
                        chartHeight={this.state.chartHeight} />
                      <TimeDistributionChart
                        years={this.state.years}
                        supplyFunction={supplyFunction}
                        chartHeight={this.state.chartHeight} />
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }

}

export default SupplyPage

/*

      lastRoundValuation: 12,


    const investorPrice = this.state.lastRoundValuation / this.state.founderSupply

                      <div className="form-group m-b-40">
                        <label className="m-b-15">Last Round Valuation</label>
                        <InputRange
                          minValue={0}
                          maxValue={50.0}
                          step={0.5}
                          formatLabel={value => `$${value}M`}
                          value={this.state.lastRoundValuation}
                          onChange={value => this.setState({
                            lastRoundValuation: Math.round(value * 10) / 10
                          })} />
                      </div>

                        <p>
                          <b>Shareholder Token Price:</b><br/>${ investorPrice }
                        </p>

                <div className="row">
                  <div className="col-md-4">
                    <FoundingShareChart years={this.state.years} supplyFunction={supplyFunction} />
                  </div>
                </div>

<YearSlider
                        years={this.state.years}
                        maxYears={100}
                        onChange={value => this.setState({
                          years: value
                        })} />

                    <DistributionChart years={this.state.years} />
*/