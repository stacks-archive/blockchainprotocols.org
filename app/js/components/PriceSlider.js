'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import InputRange from 'react-input-range'

class PriceSlider extends Component {
  static propTypes: {
    default: PropTypes.number.isRequired,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <InputRange
          minValue={0.10}
          maxValue={0.20}
          value={this.props.default}
          step={0.01}
          onChange={this.props.onChange}
        />
      </div>
    )
  }

}

export default PriceSlider