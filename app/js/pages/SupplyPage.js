'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import SupplyChart from '../components/SupplyChart'
import YearSlider from '../components/YearSlider'

class SupplyPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      years: 20,
    }

    this.onSliderChange = this.onSliderChange.bind(this)
  }

  onSliderChange(years) {
    this.setState({ years: years })
  }

  render() {
    return (
      <DocumentTitle title="Blockchain Markets">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 home-main">
                <h2>Supply</h2>

                <form className="form m-b-3">
                  <YearSlider
                    years={this.state.years}
                    maxYears={100}
                    onChange={this.onSliderChange} />
                </form>

                <SupplyChart years={this.state.years} />
              </div>
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }

}

export default SupplyPage