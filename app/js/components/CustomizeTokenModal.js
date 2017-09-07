'use strict';

import {Component} from 'react'
import Modal from 'react-modal'
import InputRange from 'react-input-range'
import {modalStyle} from '../styles'

class CustomizeTokenModal extends Component {
  static propTypes: {
    isOpen: PropTypes.bool.isRequired,
    years: PropTypes.number.isRequired,
    tokenParameters: PropTypes.object.isRequired,
    salePrice: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}
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
              value={this.props.years}
              onChange={value => this.setState({
                years: value
              })} />
          </div>
          <div className="form-group row">
            <label className="col-4">Sale Supply (MM)</label>
            <div className="col-8">
              <input className="form-control"
                value={this.props.tokenParameters.saleSupply}
                onChange={event => this.setState({
                  saleSupply: event.target.value
                })} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-4">User Supply (MM)</label>
            <div className="col-8">
              <input className="form-control"
                value={this.props.tokenParameters.userSupply}
                onChange={event => this.setState({
                  userSupply: event.target.value
                })} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-4">Creator Supply (MM)</label>
            <div className="col-8">
              <input className="form-control"
                value={this.props.tokenParameters.creatorSupply}
                onChange={event => this.setState({
                  creatorSupply: event.target.value
                })} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-4">Initial Block Reward</label>
            <div className="col-8">
              <input className="form-control"
                value={this.props.tokenParameters.initialBlockReward}
                onChange={event => this.setState({
                  initialBlockReward: event.target.value
                })} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-4">Final Block Reward</label>
            <div className="col-8">
              <input className="form-control"
                value={this.props.tokenParameters.finalBlockReward}
                onChange={event => this.setState({
                  finalBlockReward: event.target.value
                })} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-4">Token Price ($)</label>
            <div className="col-8">
              <input className="form-control"
                value={this.props.salePrice}
                onChange={event => this.setState({
                  salePrice: event.target.value
                })} />
            </div>
          </div>
        </form>
      </Modal>
    )
  }

}

export default CustomizeTokenModal