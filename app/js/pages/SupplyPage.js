'use strict'

import {Component} from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import SupplyGrowthChart from '../components/SupplyGrowthChart'
import GroupOwnershipChart from '../components/GroupOwnershipChart'
import CustomDistributionChart from '../components/CustomDistributionChart'
import CustomSupplyChart from '../components/CustomSupplyChart'
import MarketCapBarChart from '../components/MarketCapBarChart'
import MarketCapChart from '../components/MarketCapChart'
import PieOwnershipChart from '../components/PieOwnershipChart'
import YearSlider from '../components/YearSlider'
import PriceSlider from '../components/PriceSlider'
import ValueBreakdownChart from '../components/ValueBreakdownChart'

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
      defaultPrice: 0.10,
    }
  }

  render() {
    return (
      <DocumentTitle title="Blockchain Supply">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 home-main">
                <div className="row" style={{ padding: '50px 0px' }}>
                  <div className="col-md-4" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <h5 style={{ paddingBottom: '15px' }}>
                      Token price
                    </h5>
                    <PriceSlider
                      default={this.state.defaultPrice}
                      onChange={value => this.setState({
                        defaultPrice: value
                      })} />
                  </div>
                  <div className="col-md-4" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <h5 style={{ paddingBottom: '15px' }}>
                      Years to analyze
                    </h5>
                    <YearSlider
                      years={this.state.years}
                      maxYears={50}
                      onChange={value => this.setState({
                        years: value
                      })} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <MarketCapBarChart
                      years={this.state.years}
                      chartHeight={this.state.chartHeight}
                      blockstackPrice={this.state.defaultPrice} />
                  </div>
                  <div className="col-md-4">
                    <PieOwnershipChart
                      years={this.state.years}
                      chartHeight={this.state.chartHeight} />
                  </div>
                  <div className="col-md-4">
                    <CustomSupplyChart
                      id="supply-number-chart-1"
                      years={this.state.years}
                      chartHeight={this.state.chartHeight}
                      isStacked={true} />
                  </div>
                  <div className="col-md-4">
                    <CustomDistributionChart
                      years={this.state.years}
                      chartHeight={this.state.chartHeight} />
                  </div>
                  <div className="col-md-4">
                    <ValueBreakdownChart
                      years={this.state.years}
                      chartHeight={this.state.chartHeight}
                      blockstackPrice={this.state.defaultPrice} />
                  </div>
                  <div className="col-md-4">
                    <SupplyGrowthChart
                      years={this.state.years}
                      chartHeight={this.state.chartHeight} />
                  </div>
                  <div className="col-md-4">
                    <GroupOwnershipChart
                      id="share-chart-1"
                      years={this.state.years}
                      group={'creators'}
                      chartHeight={this.state.chartHeight} />
                  </div>
                  <div className="col-md-4">
                    <MarketCapChart
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