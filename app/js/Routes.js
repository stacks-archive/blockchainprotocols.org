'use strict'

import React                       from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App                         from './App'
import HomePage                    from './pages/HomePage'
import AboutPage                   from './pages/AboutPage'
import BitcoinChartsPage           from './pages/BitcoinChartsPage'
import EthereumChartsPage          from './pages/EthereumChartsPage'
import NotFoundPage                from './pages/NotFoundPage'
import MarketsPage                 from './pages/MarketsPage'

export default (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/bitcoin" component={BitcoinChartsPage} />
      <Route path="/ethereum" component={EthereumChartsPage} />
      <Route path="/markets" component={MarketsPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
)
