'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import CirculatingSupplyChart from '../components/CirculatingSupplyChart'
import SupplyGrowthChart from '../components/SupplyGrowthChart'
import GroupOwnershipChart from '../components/GroupOwnershipChart'
import CustomDistributionChart from '../components/CustomDistributionChart'
import CustomSupplyChart from '../components/CustomSupplyChart'
import MarketCapBarChart from '../components/MarketCapBarChart'
import PieOwnershipChart from '../components/PieOwnershipChart'
import {getSupply} from '../utils/supply'

class SupplyPage extends Component {
  static propTypes() {
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      years: 10,
      chartHeight: '600px',

      salePrice: 0.10,
    }
  }

  render() {
    return (
      <DocumentTitle title="Blockchain Supply">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 home-main">
                <div className="row">
                  <div className="col-md-12">
                    <MarketCapBarChart
                      years={this.state.years}
                      chartHeight={this.state.chartHeight} />
                  </div>
                  <div className="col-md-6">
                    <PieOwnershipChart
                      years={this.state.years}
                      chartHeight={this.state.chartHeight} />
                  </div>
                  <div className="col-md-6">
                    <CustomSupplyChart
                      id="supply-number-chart-1"
                      years={this.state.years}
                      chartHeight={this.state.chartHeight}
                      isStacked={true} />
                  </div>
                  <div className="col-md-6">
                    <SupplyGrowthChart
                      years={this.state.years}
                      chartHeight={this.state.chartHeight} />
                  </div>
                  <div className="col-md-6">
                    <GroupOwnershipChart
                      id="share-chart-1"
                      years={this.state.years}
                      group={'creators'}
                      chartHeight={this.state.chartHeight} />
                  </div>
                  <div className="col-md-6">
                    <CustomDistributionChart
                      years={this.state.years}
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
                    <CirculatingSupplyChart
                      years={this.state.years}
                      chartHeight={this.state.chartHeight} />
                    <GroupOwnershipChart
                      id="share-chart-2"
                      years={this.state.years}
                      group={'sale'}
                      chartHeight={this.state.chartHeight} />
*/