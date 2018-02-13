// @format
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'unstated'

import App from './app'

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('app')
)
