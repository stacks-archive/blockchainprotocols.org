'use strict'

import React     from 'react'
import {render}   from 'react-dom'

import Routes    from './Routes'

if (process.env.NODE_ENV !== 'production') {
  // Enable React devtools
  window.React = React
}

render(
  Routes,
  document.getElementById('app')
)