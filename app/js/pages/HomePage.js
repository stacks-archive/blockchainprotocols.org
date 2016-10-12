'use strict'

import React         from 'react'
import {Link, Element, Events, scrollSpy}        from 'react-scroll'
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

    Events.scrollEvent.register('begin', (to, element) => {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', (to, element) => {
      console.log("end", arguments);
    });

    scrollSpy.update();

  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
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
                  <Link to="chart_1" smooth={true} spy={true}
                    className="btn btn-secondary anchor">
                    Transaction Growth
                  </Link>
                  <Link to="chart_2" smooth={true} spy={true}
                    className="btn btn-secondary anchor">
                    Transaction Growth (log)
                  </Link>
                  <Link to="chart_3" smooth={true} spy={true}
                    className="btn btn-secondary anchor">
                    Growth by Protocol
                  </Link>
                  <Link to="chart_4" smooth={true} spy={true}
                    className="btn btn-secondary anchor">
                    Breakdown by Protocol
                  </Link>
                  <Link to="chart_5" smooth={true} spy={true}
                    className="btn btn-secondary anchor">
                    Last Week's Breakdown
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div>
                  <Element name="chart_1" className="element">
                    <h3 className="chart-header">Transaction Growth</h3>
                    <div id="total_div" className="chart"></div>
                  </Element>
                  <Element name="chart_2" className="element">
                    <h3 className="chart-header">Transaction Growth (log)</h3>
                    <div id="total_div_log" className="chart"></div>
                  </Element>
                  <Element name="chart_3" className="element">
                    <h3 className="chart-header">Growth by Protocol</h3>
                    <div id="proto_div" className="chart"></div>
                  </Element>
                  <Element name="chart_4" className="element">
                    <h3 className="chart-header">Breakdown by Protocol</h3>
                    <div id="cumulative_div" className="chart"></div>
                  </Element>
                  <Element name="chart_5" className="element">
                    <h3 className="chart-header">Last Week's Breakdown</h3>
                    <div id="week_div" className="chart"></div>
                  </Element>
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