'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import d3            from 'd3';
import {drawDailyRegistrationsChart, drawTotalRegistrationsChart} from '../utils/d3-utils';
import {chartData, chartData2} from '../utils/chartData'

const propTypes = {
  currentUser: React.PropTypes.object
};

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    drawDailyRegistrationsChart(".daily-registrations-chart", chartData);
    drawTotalRegistrationsChart(".total-registrations-chart", chartData2);
  }

  render() {
    return (
      <DocumentTitle title="Home">
        <section className="home-page">
          <div className="chart daily-registrations-chart">
          </div>
          <div className="chart total-registrations-chart">
          </div>
        </section>
      </DocumentTitle>
    );
  }

}

HomePage.propTypes = propTypes;

export default HomePage;