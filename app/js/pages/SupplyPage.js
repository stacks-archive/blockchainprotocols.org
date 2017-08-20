'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import Modal from 'react-modal'
import {Button} from 'react-bootstrap'
import InputRange from 'react-input-range'

import CirculatingSupplyChart from '../components/CirculatingSupplyChart'
import SupplyGrowthChart from '../components/SupplyGrowthChart'
import GroupOwnershipChart from '../components/GroupOwnershipChart'
import CustomDistributionChart from '../components/CustomDistributionChart'
import CustomSupplyChart from '../components/CustomSupplyChart'
import {getTokenSupplyFunction} from '../utils/supply'
import {modalStyle} from '../styles'

class SupplyPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      years: 20,
      saleSupply: 1200,
      giveawaySupply: 300,
      creatorSupply: 600,
      initialBlockReward: 10000,
      finalBlockReward: 2000,
      rewardDecay: 500,
      salePrice: 0.10,
      numUsers: 30000,
      treasuryPercentage: 0.5,
      chartHeight: '400px',
    }
  }

  render() {
    const parameters = {
      saleSupply: this.state.saleSupply * Math.pow(10, 6),
      giveawaySupply: this.state.giveawaySupply * Math.pow(10, 6),
      creatorSupply: this.state.creatorSupply * Math.pow(10, 6),
      initialBlockReward: this.state.initialBlockReward,
      finalBlockReward: this.state.finalBlockReward,
      rewardDecay: this.state.rewardDecay,
    }
    const supplyFunction = getTokenSupplyFunction('halving', parameters)
    
    const amountRaised = this.state.saleSupply * this.state.salePrice * Math.pow(10, 6)
    const amountGivenOut = this.state.giveawaySupply * this.state.salePrice * Math.pow(10, 6)
    const amountToCreators = this.state.creatorSupply * this.state.salePrice * Math.pow(10, 6)
    const amountToTreasury = amountToCreators * this.state.treasuryPercentage
    const amountToShareholders = amountToCreators - amountToTreasury
    const rewardPerUser = amountGivenOut / this.state.numUsers

    const coinsInABillionth = supplyFunction(20).total / Math.pow(10, 9)
    const pricePerBillionth = this.state.salePrice * coinsInABillionth

    return (
      <DocumentTitle title="Blockchain Supply">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 home-main">

                <p>
                  <Button
                    className="btn btn-sm btn-default"
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.setState({ modalIsOpen: true })}>
                    Customize Token
                  </Button>
                </p>

                <p>
                  Amount raised: ${amountRaised.toLocaleString()}
                </p>
                <p>
                  Amount given out: ${amountGivenOut.toLocaleString()}
                </p>
                <p>
                  Amount to Blockstack Inc.: ${amountToCreators.toLocaleString()}
                </p>
                <p>
                  Amount to shareholders: ${amountToShareholders.toLocaleString()}
                </p>
                <p>
                  Amount to treasury: ${amountToTreasury.toLocaleString()}
                </p>
                <p>
                  Reward per user: ${rewardPerUser.toLocaleString()}
                </p>
                <p>
                  # of users rewarded: {this.state.numUsers.toLocaleString()}
                </p>
                <p>
                  Price per billionth: ${pricePerBillionth}
                </p>

                <Modal isOpen={this.state.modalIsOpen}
                  onRequestClose={() => {
                    this.setState({ modalIsOpen: false })
                  }}
                  contentLabel="Token Economics Parameters"
                  shouldCloseOnOverlayClick={true}
                  style={modalStyle}>
                  <form>
                    <h2>
                      Customize Token
                    </h2>
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
                    <div className="form-group row">
                      <label className="col-4">Sale Supply (MM)</label>
                      <div className="col-8">
                        <input className="form-control"
                          value={this.state.saleSupply}
                          onChange={event => this.setState({
                            saleSupply: event.target.value
                          })} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-4">User Supply (MM)</label>
                      <div className="col-8">
                        <input className="form-control"
                          value={this.state.userSupply}
                          onChange={event => this.setState({
                            userSupply: event.target.value
                          })} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-4">Creator Supply (MM)</label>
                      <div className="col-8">
                        <input className="form-control"
                          value={this.state.creatorSupply}
                          onChange={event => this.setState({
                            creatorSupply: event.target.value
                          })} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-4">Initial Block Reward</label>
                      <div className="col-8">
                        <input className="form-control"
                          value={this.state.initialBlockReward}
                          onChange={event => this.setState({
                            initialBlockReward: event.target.value
                          })} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-4">Final Block Reward</label>
                      <div className="col-8">
                        <input className="form-control"
                          value={this.state.finalBlockReward}
                          onChange={event => this.setState({
                            finalBlockReward: event.target.value
                          })} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-4">Token Price ($)</label>
                      <div className="col-8">
                        <input className="form-control"
                          value={this.state.salePrice}
                          onChange={event => this.setState({
                            salePrice: event.target.value
                          })} />
                      </div>
                    </div>
                  </form>
                </Modal>
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