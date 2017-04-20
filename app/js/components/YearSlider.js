'use strict';

import {Component} from 'react'
import PropTypes from 'prop-types'
import InputRange from 'react-input-range'

class YearSlider extends Component {
  static propTypes: {
    years: PropTypes.number.isRequired,
    maxYears: PropTypes.number.isRequired,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <InputRange
          minValue={0}
          maxValue={this.props.maxYears}
          value={this.props.years}
          onChange={this.props.onChange}
        />
      </div>
    )
  }

}

export default YearSlider