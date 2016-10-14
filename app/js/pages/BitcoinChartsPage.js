'use strict'

import React         from 'react'
import {
  Link, Element, Events, scrollSpy
}                    from 'react-scroll'
import DocumentTitle from 'react-document-title'
import Header        from '../components/Header'
import {Chart} from 'react-google-charts'
import request       from 'request'

const propTypes = {
  currentUser: React.PropTypes.object
}

class BitcoinChartsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      chartsLoaded: false
    }

    this.setChartData = this.setChartData.bind(this)
  }

  setChartData(body) {
    const jsonResponse = JSON.parse(body)

    let chart1Columns = [
      {
        "id": "x",
        "label": "Date",
        "type": "date"
      },
      {
        "id": "A",
        "label": "# of transactions",
        "type": "number"
      }
    ]
    let chart1Rows = [],
        chart2Rows = [],
        chart3Rows = [],
        chart4Rows = [],
        chart5Rows = []

    /* Chart 1 */
    jsonResponse.total.rows.forEach((row) => {
      let dateString = row.c[0].v,
          dateParts = dateString.split(/[(),]+/),
          date = new Date(dateParts[1], dateParts[2], dateParts[3])
      let modifiedRow = [date, row.c[1].v]
      chart1Rows.push(modifiedRow)
    })

    /* Chart 2 */
    chart2Rows = chart1Rows

    /* Chart 3 */
    jsonResponse.proto.rows.forEach((row) => {
      let dateString = row.c[0].v,
          dateParts = dateString.split(/[(),]+/),
          date = new Date(dateParts[1], dateParts[2], dateParts[3])
      let modifiedRow = [date]
      row.c.slice(1).forEach((rowItem) => {
        let protocolTransactionCount = 0
        if (rowItem.hasOwnProperty('v')) {
          protocolTransactionCount = rowItem.v
        }
        modifiedRow.push(protocolTransactionCount)
      })
      chart3Rows.push(modifiedRow)
    })

    /* Chart 4 */
    jsonResponse.cumulative.rows.forEach((row) => {
      let modifiedRow = [row.c[0].v, row.c[1].v]
      chart4Rows.push(modifiedRow)
    })

    /* Chart 5 */
    jsonResponse.week.rows.forEach((row) => {
      let modifiedRow = [row.c[0].v, row.c[1].v]
      chart5Rows.push(modifiedRow)
    })

    const chartAreaSettings = {
      left:   75,
      top:    50,
      right:  150,
      bottom: 75
    }

    this.setState({
      chartsLoaded: true,
      chart1Data: {
        rows: chart1Rows,
        columns: chart1Columns
      },
      chart1Options: {
        vAxis: {
          title: 'Transactions per day',
          logScale: false,
          minValue: 0,
          viewWindow: {
            max: 6000,
            min: 0
          }
        },
        chartArea: chartAreaSettings
      },
      chart2Data: {
        rows: chart2Rows,
        columns: chart1Columns
      },
      chart2Options: {
        vAxis: {
          logScale: true,
          minValue: 0
        },
        chartArea: chartAreaSettings
      },
      chart3Data: {
        rows: chart3Rows,
        columns: jsonResponse.proto.cols
      },
      chart3Options: {
        isStacked: 'true',
        colors: jsonResponse.protoColors,
        vAxis: {
          minValue: 0,
          ticks: [0, .25, .5, .75, 1]
        },
        chartArea: chartAreaSettings
      },
      chart4Data: {
        rows: chart4Rows,
        columns: jsonResponse.cumulative.cols
      },
      chart4Options: {
        vAxis: {minValue: 0},
        colors: jsonResponse.cumulativeColors,
        chartArea: chartAreaSettings
      },
      chart5Data: {
        rows: chart5Rows,
        columns: jsonResponse.week.cols
      },
      chart5Options: {
        vAxis: {minValue: 0},
        colors: jsonResponse.weekColors,
        chartArea: chartAreaSettings
      }
    })
  }

  componentWillMount() {
    request({
      url: "https://storage.googleapis.com/opreturn-976.appspot.com/op_return_stats.json",
      withCredentials: false
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        this.setChartData(body)
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
                  </div>
                </ul>

                <div>
                  This page shows statistics on protocols embedding raw data in the Bitcoin blockchain.
                  Specifically, these protocols use a data field known as OP_RETURN.
                  Stats are compiled by analyzing the first 3 bytes inside each OP_RETURN field and comparing them against known byte prefixes used by each protocol.
                </div>

              </div>

              <div className="col-md-8 offset-md-4 col-lg-9 offset-lg-3 bitcoin-protocols-main">
                { this.state.chartsLoaded ?
                <div>
                  <Element name="chart_1" className="element">
                    <h3 className="chart-header">Transaction Growth</h3>
                    <Chart chartType="AreaChart"
                      rows={this.state.chart1Data.rows}
                      columns={this.state.chart1Data.columns}
                      options={this.state.chart1Options}
                      width={"100%"} height={"800px"} graph_id="total_div" />
                  </Element>
                  <Element name="chart_2" className="element">
                    <h3 className="chart-header">Transaction Growth (log)</h3>
                    <Chart chartType="AreaChart"
                      rows={this.state.chart2Data.rows}
                      columns={this.state.chart2Data.columns}
                      options={this.state.chart2Options}
                      width={"100%"} height={"800px"} graph_id="total_div_log" />
                  </Element>
                  <Element name="chart_3" className="element">
                    <h3 className="chart-header">Growth by Protocol</h3>
                    <Chart chartType="AreaChart"
                      rows={this.state.chart3Data.rows}
                      columns={this.state.chart3Data.columns}
                      options={this.state.chart3Options}
                      width={"100%"} height={"800px"} graph_id="proto_div" />
                  </Element>
                  <Element name="chart_4" className="element">
                    <h3 className="chart-header">Breakdown by Protocol</h3>
                    <Chart chartType="PieChart"
                      rows={this.state.chart4Data.rows}
                      columns={this.state.chart4Data.columns}
                      options={this.state.chart4Options}
                      width={"100%"} height={"800px"} graph_id="cumulative_div" />
                  </Element>
                  <Element name="chart_5" className="element">
                    <h3 className="chart-header">Last Week's Breakdown</h3>
                    <Chart chartType="PieChart"
                      rows={this.state.chart5Data.rows}
                      columns={this.state.chart5Data.columns}
                      options={this.state.chart5Options}
                      width={"100%"} height={"800px"} graph_id="week_div" />
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
