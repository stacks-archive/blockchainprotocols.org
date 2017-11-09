'use strict'

import React                       from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App                         from './App'
import AboutPage                   from './pages/AboutPage'
import BitcoinChartsPage           from './pages/BitcoinChartsPage'
import EthereumChartsPage          from './pages/EthereumChartsPage'
import NotFoundPage                from './pages/NotFoundPage'
import MarketsPage                 from './pages/MarketsPage'
import SupplyPage                  from './pages/SupplyPage'

export default (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={SupplyPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/bitcoin" component={BitcoinChartsPage} />
      <Route path="/ethereum" component={EthereumChartsPage} />
      <Route path="/markets" component={MarketsPage} />
      <Route path="/supply" component={SupplyPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
)
