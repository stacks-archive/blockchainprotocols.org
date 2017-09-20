'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import CirculatingSupplyChart from '../components/CirculatingSupplyChart'
import SupplyGrowthChart from '../components/SupplyGrowthChart'
import GroupOwnershipChart from '../components/GroupOwnershipChart'
import CustomDistributionChart from '../components/CustomDistributionChart'
import CustomSupplyChart from '../components/CustomSupplyChart'
import {getTokenSupplyFunction} from '../utils/supply'

class SupplyPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      years: 20,
      chartHeight: '500px',

      salePrice: 0.20,
    }
  }

  render() {
    /*
    const parameters = {
      blocksPerYear: this.state.blocksPerYear,
      initialBlockReward: this.state.initialBlockReward,
      rewardDecayBase: this.state.rewardDecayBase,
      finalBlockReward: this.state.finalBlockReward,
      yearsBetweenDecays: this.state.yearsBetweenDecays,
      numberOfMiningDecays: this.state.numberOfMiningDecays,

    }
      finalBlockReward: 3000,
      numUsers: 70000,

      saleSupply: this.state.saleSupply * Math.pow(10, 6),
      giveawaySupply: this.state.giveawaySupply * Math.pow(10, 6),
      creatorSupply: this.state.creatorSupply * Math.pow(10, 6),
      finalBlockReward: this.state.finalBlockReward,
    */
    const supplyFunction = getTokenSupplyFunction()
    
    const supply = supplyFunction(20)

    const saleSupply =  supply.sale
    const saleSupplyUSD = saleSupply * this.state.salePrice
    const creatorSupply = supply.creators
    const creatorSupplyUSD = creatorSupply * this.state.salePrice
    const userSupply = supply.users
    //const appSupply = supplyFunction(20).apps
    //const userSupplyUSD = userSupply * this.state.salePrice
    /*const amountToTreasury = creatorSupply * this.state.treasuryPercentage
    const amountToShareholders = amountToCreators - amountToTreasury
    const amountRaised = this.state.saleSupply * this.state.salePrice * Math.pow(10, 6)
    const amountGivenOut = this.state.giveawaySupply * this.state.salePrice * Math.pow(10, 6)
    const amountToCreators = this.state.creatorSupply * this.state.salePrice * Math.pow(10, 6)
    const rewardPerUser = amountGivenOut / this.state.numUsers
    */

    const pricePerBillionth20Y = this.state.salePrice * supplyFunction(20).total / Math.pow(10, 9)
    const pricePerBillionth4Y = this.state.salePrice * supplyFunction(4).total / Math.pow(10, 9)
    //const pricePerBillionth1Y = this.state.salePrice * supplyFunction(1).total / Math.pow(10, 9)

    const blockstackPBCValuation = 23.5 * Math.pow(10, 6)
    const blockstackPBCSupply = creatorSupply*0.75
    const blockstackPBCSupplyUSD = creatorSupplyUSD*0.8
    const treasurySupplyUSD = creatorSupplyUSD*0.2

    return (
      <DocumentTitle title="Blockchain Supply">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 home-main">
                <p>
                  Sale supply: {saleSupply.toLocaleString()}
                </p>
                <p>
                  Creator supply: {creatorSupply.toLocaleString()}
                </p>
                <p>
                  User wave 1 supply: {(supply.alphaUsers).toLocaleString()}
                </p>
                <p>
                  User wave 2 supply: {(supply.betaUsers).toLocaleString()}
                </p>
                <p>
                  Initial block reward: {supply.initialBlockReward.toLocaleString()}
                </p>
                <p>
                  Final block reward: {supply.finalBlockReward.toLocaleString()}
                </p>
                <p>
                  Annual reward reduction: {supply.rewardDecayBase.toLocaleString()}
                </p>
              </div>
              <div className="col-md-6 home-main">
                <p>
                  Token price: ${this.state.salePrice.toLocaleString()}
                </p>
                <p>
                  Shareholder price: ${(blockstackPBCValuation/blockstackPBCSupply).toLocaleString()}
                </p>
                <p>
                  Amount raised: ${saleSupplyUSD.toLocaleString()}
                </p>
                <p>
                  Amount to PBC shareholders: ${(blockstackPBCSupplyUSD).toLocaleString()}
                </p>
                <p>
                  Amount to treasury: ${(treasurySupplyUSD).toLocaleString()}
                </p>
                <p>
                  Price per billionth (20Y): ${pricePerBillionth20Y.toLocaleString()}
                </p>
                <p>
                  Price per billionth (4Y): ${pricePerBillionth4Y.toLocaleString()}
                </p>
                <p>
                  Market cap after 1 year (at current price): ${(this.state.salePrice * supplyFunction(1).total).toLocaleString()}
                </p>
                <p>
                  Market cap after 4 years (at current price): ${(this.state.salePrice * supplyFunction(4).total).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 home-main">
                <div className="row">
                  <div className="col-md-4">
                    <CirculatingSupplyChart
                      years={this.state.years}
                      supplyFunction={supplyFunction}
                      chartHeight={this.state.chartHeight} />
                    <SupplyGrowthChart
                      years={this.state.years}
                      supplyFunction={supplyFunction}
                      chartHeight={this.state.chartHeight} />
                  </div>
                  <div className="col-md-4">
                    <GroupOwnershipChart
                      id="share-chart-1"
                      years={this.state.years}
                      supplyFunction={supplyFunction}
                      group={'creators'}
                      chartHeight={this.state.chartHeight} />
                    <GroupOwnershipChart
                      id="share-chart-2"
                      years={this.state.years}
                      supplyFunction={supplyFunction}
                      group={'sale'}
                      chartHeight={this.state.chartHeight} />
                  </div>
                  <div className="col-md-4">
                    <CustomSupplyChart
                      id="supply-number-chart-1"
                      years={this.state.years}
                      supplyFunction={supplyFunction}
                      chartHeight={this.state.chartHeight}
                      isStacked={true} />
                    <CustomDistributionChart
                      years={this.state.years}
                      supplyFunction={supplyFunction}
                      chartHeight={this.state.chartHeight} />
                  </div>
                </div>
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
                <p>
                  Price per billionth (1Y): ${pricePerBillionth1Y.toLocaleString()}
                </p>
                <p>
                  Amount to shareholders: ${amountToShareholders.toLocaleString()}
                </p>
                <p>
                  Amount to treasury: ${amountToTreasury.toLocaleString()}
                </p>
                <p>
                  # of users in giveaway: {this.state.numUsers.toLocaleString()}
                </p>
                <p>
                  Reward per user: ${rewardPerUser.toLocaleString()}
                </p>
                <p>
                  Giveaway supply: {this.state.giveawaySupply.toLocaleString()}
                </p>
                <p>
                  Amount given out: ${amountGivenOut.toLocaleString()}
                </p>
                <p>
                  Shareholder % after 4 years: {shareholderSupplyAfterFourYears.toLocaleString()}
                </p>

                <p>
                  <Button
                    className="btn btn-sm btn-default"
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.setState({ modalIsOpen: true })}>
                    Customize Token
                  </Button>
                </p>


                    <div className="form-group m-b-40">
                      <label className="m-b-15">Initial Sale Price ($)</label>
                      <input className="form-control"
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
                    <CustomSupplyChart
                      id="supply-number-chart-2"
                      years={this.state.years}
                      supplyFunction={supplyFunction}
                      chartHeight={this.state.chartHeight}
                      isStacked={false} />


<div className="col-md-5">
                      
                    </div>



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