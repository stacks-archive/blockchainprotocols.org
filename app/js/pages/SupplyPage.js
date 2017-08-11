'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import Modal from 'react-modal'
import {Button} from 'react-bootstrap'

import CirculatingSupplyChart from '../components/CirculatingSupplyChart'
import SupplyGrowthChart from '../components/SupplyGrowthChart'
import GroupOwnershipChart from '../components/GroupOwnershipChart'
import CustomDistributionChart from '../components/CustomDistributionChart'
import CustomSupplyChart from '../components/CustomSupplyChart'

import {getTokenSupplyFunction} from '../utils/supply'
import InputRange from 'react-input-range'

class SupplyPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      years: 20,
      saleSupply: 600,
      userSupply: 400,
      creatorSupply: 400,
      initialBlockReward: 8000,
      finalBlockReward: 1000,
      salePrice: 0.15,
      chartHeight: '400px'
    }
  }

  render() {
    const parameters = {
      saleSupply: this.state.saleSupply * Math.pow(10, 6),
      creatorSupply: this.state.creatorSupply * Math.pow(10, 6),
      userSupply: this.state.userSupply * Math.pow(10, 6),
      initialBlockReward: this.state.initialBlockReward,
      finalBlockReward: this.state.finalBlockReward,
    }
    const supplyFunction = getTokenSupplyFunction('halving', parameters)
    //const amountRaised = this.state.saleSupply * this.state.salePrice * Math.pow(10, 6)

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

                <Modal isOpen={this.state.modalIsOpen}
                  onRequestClose={() => {
                    this.setState({ modalIsOpen: false })
                  }}
                  contentLabel="Token Economics Parameters"
                  shouldCloseOnOverlayClick={true}
                  style={{
                    overlay: {
                      position: 'fixed',
                      top: '70px',
                      left: '0',
                      right: '0',
                      zIndex: 10
                    },
                    content: {
                      width: '50%',
                      top: '50%',
                      left: '50%',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                    }
                  }}>
                  <form>
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
                      <label className="m-b-15">Sale Supply (MM)</label>
                      <input className="form-control"
                        value={this.state.saleSupply}
                        onChange={event => this.setState({
                          saleSupply: event.target.value
                        })} />
                    </div>
                    <div className="form-group m-b-40">
                      <label className="m-b-15">User Supply (MM)</label>
                      <input className="form-control"
                        value={this.state.userSupply}
                        onChange={event => this.setState({
                          userSupply: event.target.value
                        })} />
                    </div>
                    <div className="form-group m-b-40">
                      <label className="m-b-15">Creator Supply (MM)</label>
                      <input className="form-control"
                        value={this.state.creatorSupply}
                        onChange={event => this.setState({
                          creatorSupply: event.target.value
                        })} />
                    </div>
                    <div className="form-group m-b-40">
                      <label className="m-b-15">Initial Block Reward</label>
                      <input className="form-control"
                        value={this.state.initialBlockReward}
                        onChange={event => this.setState({
                          initialBlockReward: event.target.value
                        })} />
                    </div>
                    <div className="form-group m-b-40">
                      <label className="m-b-15">Final Block Reward</label>
                      <input className="form-control"
                        value={this.state.finalBlockReward}
                        onChange={event => this.setState({
                          finalBlockReward: event.target.value
                        })} />
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