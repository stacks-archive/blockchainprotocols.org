'use strict'

import React         from 'react'
import {
  Link, Element, Events, scrollSpy
}                    from 'react-scroll'
import DocumentTitle from 'react-document-title'
import {Chart}       from 'react-google-charts'
import request       from 'request'

import Header        from '../components/Header'
import {
  getChartData, getChartOptions
} from '../utils/charts'

const propTypes = {
  currentUser: React.PropTypes.object
}

class BitcoinChartsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      chartsLoaded: false
    }

    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateDimensions() {
    let dimensions = {
      width: this.state.width,
      height: this.state.height
    }
    let chartOptions = getChartOptions(this.state.chartData, dimensions)
    this.setState({
      width: $('#chart-panel').width(), 
      height: $('#chart-panel').height(),
      chartsLoaded: true,
      chartOptions: chartOptions
    })
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  componentWillMount() {
    request({
      url: "https://storage.googleapis.com/opreturn-976.appspot.com/op_return_stats.json",
      withCredentials: false
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let chartData = getChartData(body)
        this.setState({
          chartData: chartData
        })
        this.updateDimensions()
      } else {
        console.log(error)
      }
    })

    scrollSpy.update();
  }

  render() {
    return (
      <DocumentTitle title="Bitcoin Protocol Charts">
        <div>
          <Header />

          <div className="container-fluid">
            <div className="row">

              <div className="col-md-4 col-lg-3 sidebar hidden-sm-down">
                <ul className="nav nav-sidebar">
                  <div className="btn-group-vertical">
                    <Link to="chart_1" smooth={true} spy={true}
                      className="btn btn-secondary">
                      Transaction Growth
                    </Link>
                    <Link to="chart_2" smooth={true} spy={true}
                      className="btn btn-secondary">
                      Transaction Growth (log)
                    </Link>
                    <Link to="chart_3" smooth={true} spy={true}
                      className="btn btn-secondary">
                      Growth by Protocol
                    </Link>
                    <Link to="chart_4" smooth={true} spy={true}
                      className="btn btn-secondary">
                      Breakdown by Protocol
                    </Link>
                    <Link to="chart_5" smooth={true} spy={true}
                      className="btn btn-secondary">
                      Last Week's Breakdown
                    </Link>
                    <Link to="chart_6" smooth={true} spy={true}
                      className="btn btn-secondary">
                      Financial Protocols
                    </Link>
                    <Link to="chart_7" smooth={true} spy={true}
                      className="btn btn-secondary">
                      Non-financial Protocols
                    </Link>
                  </div>
                </ul>

                <p>
                  This page shows statistics on protocols embedding raw data in the Bitcoin blockchain.
                  Specifically, these protocols use a data field known as OP_RETURN.
                  Stats are compiled by analyzing the first 3 bytes inside each OP_RETURN field and comparing them against known byte prefixes used by each protocol.
                </p>

              </div>

              <div className="col-md-8 offset-md-4 col-lg-9 offset-lg-3 bitcoin-protocols-main"
                id="chart-panel">
                { this.state.chartsLoaded ?
                <div>
                  <Element name="chart_1" className="element">
                    <h3 className="chart-header">Transaction Growth</h3>
                    <Chart chartType="AreaChart"
                      rows={this.state.chartData.chart1.rows}
                      columns={this.state.chartData.chart1.columns}
                      options={this.state.chartOptions.chart1}
                      width={"100%"} height={"800px"} graph_id="total_div" />
                  </Element>
                  <Element name="chart_2" className="element">
                    <h3 className="chart-header">Transaction Growth (log)</h3>
                    <Chart chartType="AreaChart"
                      rows={this.state.chartData.chart2.rows}
                      columns={this.state.chartData.chart2.columns}
                      options={this.state.chartOptions.chart2}
                      width={"100%"} height={"800px"} graph_id="total_div_log" />
                  </Element>
                  <Element name="chart_3" className="element">
                    <h3 className="chart-header">Growth by Protocol</h3>
                    <Chart chartType="AreaChart"
                      rows={this.state.chartData.chart3.rows}
                      columns={this.state.chartData.chart3.columns}
                      options={this.state.chartOptions.chart3}
                      width={"100%"} height={"800px"} graph_id="proto_div" />
                  </Element>
                  <Element name="chart_4" className="element">
                    <h3 className="chart-header">Breakdown by Protocol</h3>
                    <Chart chartType="PieChart"
                      rows={this.state.chartData.chart4.rows}
                      columns={this.state.chartData.chart4.columns}
                      options={this.state.chartOptions.chart4}
                      width={"100%"} height={"800px"} graph_id="cumulative_div" />
                  </Element>
                  <Element name="chart_5" className="element">
                    <h3 className="chart-header">Last Week's Breakdown</h3>
                    <Chart chartType="PieChart"
                      rows={this.state.chartData.chart5.rows}
                      columns={this.state.chartData.chart5.columns}
                      options={this.state.chartOptions.chart5}
                      width={"100%"} height={"800px"} graph_id="week_div" />
                  </Element>
                  <Element name="chart_6" className="element">
                    <h3 className="chart-header">Financial Protocols</h3>
                    <Chart chartType="PieChart"
                      rows={this.state.chartData.chart6.rows}
                      columns={this.state.chartData.chart6.columns}
                      options={this.state.chartOptions.chart6}
                      width={"100%"} height={"800px"} graph_id="financial_div" />
                  </Element>
                  <Element name="chart_7" className="element">
                    <h3 className="chart-header">Non-financial Protocols</h3>
                    <Chart chartType="PieChart"
                      rows={this.state.chartData.chart7.rows}
                      columns={this.state.chartData.chart7.columns}
                      options={this.state.chartOptions.chart7}
                      width={"100%"} height={"800px"} graph_id="non_financial_div" />
                  </Element>
                </div>
                : null }
              </div>

            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }

}

BitcoinChartsPage.propTypes = propTypes

export default BitcoinChartsPage
