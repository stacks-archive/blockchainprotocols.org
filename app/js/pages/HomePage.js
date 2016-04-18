'use strict'

import React         from 'react'
import {Link}        from 'react-router'
import DocumentTitle from 'react-document-title'
import d3            from 'd3'
import {drawDailyRegistrationsChart, drawTotalRegistrationsChart} from '../utils/d3-utils'
import {dailyRegistrationsData, dailyRegistrationsDataWithOffset} from '../utils/chartData'
import Header        from '../components/Header'

const propTypes = {
  currentUser: React.PropTypes.object
}

class HomePage extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    drawDailyRegistrationsChart(".daily-registrations-chart-2", dailyRegistrationsData)
    drawTotalRegistrationsChart(".total-registrations-chart-2", dailyRegistrationsDataWithOffset)
  }

  render() {
    return (
      <DocumentTitle title="Home">
        <div>
          <div className="container-fluid col-centered bg-primary block">
            <Header />
          </div>
          <div className="container-fluid">
            <section className="home-page chart-section">
              <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                  <h3>Daily Registrations</h3>
                  <h5></h5>
                  <div className="chart daily-registrations-chart-2 m-b-2">
                  </div>
                  <h3>Aggregate Registrations</h3>
                  <h5></h5>
                  <div className="chart total-registrations-chart-2 m-b-2">
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </DocumentTitle>
    )
  }

}

HomePage.propTypes = propTypes

export default HomePage