'use strict'

import React         from 'react'
import {Link}        from 'react-router'
import DocumentTitle from 'react-document-title'
import Header        from '../components/Header'
import {drawChart} from '../utils/charts.js'

const propTypes = {
  currentUser: React.PropTypes.object
}

class HomePage extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    google.charts.load("visualization", "1.0", {packages:["corechart"]});
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);
  }

  render() {
    return (
      <DocumentTitle title="Home">
        <div>
          <Header />

          <div className="container-fluid">
            <div className="row">

              <div className="col-lg-3 col-md-4 hidden-sm-down">
                <div className="btn-group-vertical" style={{ position: 'fixed', paddingTop: '70px' }}>
                  <a href="#chart_1" className="btn btn-secondary anchor">
                    Transaction Growth
                  </a>
                  <a href="#chart_2" className="btn btn-secondary anchor">
                    Transaction Growth (log)
                  </a>
                  <a href="#chart_3" className="btn btn-secondary anchor">
                    Growth by Protocol
                  </a>
                  <a href="#chart_4" className="btn btn-secondary anchor">
                    Breakdown by Protocol
                  </a>
                  <a href="#chart_5" className="btn btn-secondary anchor">
                    Last Week's Breakdown
                  </a>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div>
                  <div id="chart_1">
                    <h3 className="chart-header">Transaction Growth</h3>
                    <div id="total_div" className="chart"></div>
                  </div>
                  <div id="chart_2">
                    <h3 className="chart-header">Transaction Growth (log)</h3>
                    <div id="total_div_log" className="chart"></div>
                  </div>
                  <div id="chart_3">
                    <h3 className="chart-header">Growth by Protocol</h3>
                    <div id="proto_div" className="chart"></div>
                  </div>
                  <div id="chart_4">
                    <h3 className="chart-header">Breakdown by Protocol</h3>
                    <div id="cumulative_div" className="chart"></div>
                  </div>
                  <div id="chart_5">
                    <h3 className="chart-header">Last Week's Breakdown</h3>
                    <div id="week_div" className="chart"></div>
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

HomePage.propTypes = propTypes

export default HomePage