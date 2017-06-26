'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import SupplyChart from '../components/SupplyChart'
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
      saleSupply: 60,
      founderSupply: 12,
      miningSupplyPerYear: 12,
      miningDecayCoefficient: 0.5,
      miningDecayInterval: 4,
      numberOfMiningDecays: 2,
      salePrice: 2.0,
      lastRoundValuation: 24,
    }
  }

  render() {
    const supplyFunction = getTokenSupplyFunction(
      this.state.saleSupply * Math.pow(10, 6),
      this.state.founderSupply * Math.pow(10, 6),
      this.state.miningSupplyPerYear * Math.pow(10, 6),
      this.state.miningDecayCoefficient,
      this.state.miningDecayInterval,
      this.state.numberOfMiningDecays
    )
    const amountRaised = this.state.saleSupply * this.state.salePrice * Math.pow(10, 6)
    const investorPrice = this.state.lastRoundValuation / this.state.founderSupply

    return (
      <DocumentTitle title="Blockchain Markets">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 home-main">
                <form>
                  <div className="row">
                    <div className="col-md-2">
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Sale Supply</label>
                        <InputRange
                          minValue={0}
                          maxValue={100}
                          formatLabel={value => `${value}M`}
                          value={this.state.saleSupply}
                          onChange={value => this.setState({
                            saleSupply: value
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Creator Supply</label>
                        <InputRange
                          minValue={0}
                          maxValue={100}
                          formatLabel={value => `${value}M`}
                          value={this.state.founderSupply}
                          onChange={value => this.setState({
                            founderSupply: value
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Mining Supply Per Year</label>
                        <InputRange
                          minValue={0}
                          maxValue={100}
                          formatLabel={value => `${value}M`}
                          value={this.state.miningSupplyPerYear}
                          onChange={value => this.setState({
                            miningSupplyPerYear: value
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Mining Decay Coefficient</label>
                        <InputRange
                          minValue={0}
                          maxValue={1.0}
                          step={0.01}
                          value={this.state.miningDecayCoefficient}
                          onChange={value => this.setState({
                            miningDecayCoefficient: Math.round(value * 100) / 100
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Mining Decay Interval</label>
                        <InputRange
                          minValue={0}
                          maxValue={10}
                          formatLabel={value => `${value} years`}
                          value={this.state.miningDecayInterval}
                          onChange={value => this.setState({
                            miningDecayInterval: value
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15"># of Mining Decay Events</label>
                        <InputRange
                          minValue={0}
                          maxValue={10}
                          value={this.state.numberOfMiningDecays}
                          onChange={value => this.setState({
                            numberOfMiningDecays: value
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Initial Sale Price</label>
                        <InputRange
                          minValue={0}
                          maxValue={10.0}
                          step={0.1}
                          formatLabel={value => `$${value}`}
                          value={this.state.salePrice}
                          onChange={value => this.setState({
                            salePrice: Math.round(value * 10) / 10
                          })} />
                      </div>
                      <div className="form-group m-b-40">
                        <label className="m-b-15">Last Round Valuation</label>
                        <InputRange
                          minValue={0}
                          maxValue={50.0}
                          formatLabel={value => `$${value}M`}
                          value={this.state.lastRoundValuation}
                          onChange={value => this.setState({
                            lastRoundValuation: value
                          })} />
                      </div>
                      <div className="m-b-40">
                        <p>
                          <b>Amount Sold in Crowdsale:</b><br/>${ amountRaised.toLocaleString() }
                        </p>
                        <p>
                          <b>Shareholder Token Price:</b><br/>${ investorPrice }
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <SupplyChart years={this.state.years} supplyFunction={supplyFunction} chartHeight={'500px'} />
                      <FoundingShareChart years={this.state.years} supplyFunction={supplyFunction} chartHeight={'500px'} />
                    </div>
                    <div className="col-md-5">
                      <SupplyGrowthChart years={this.state.years} supplyFunction={supplyFunction} chartHeight={'500px'} />
                      <TimeDistributionChart years={this.state.years} supplyFunction={supplyFunction} chartHeight={'500px'} />
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