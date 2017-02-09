import React from 'react';
import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { render } from 'react-dom';

import configureStore from './store/configure_store.js';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';

import './application.css';

const initialState = {};
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes();

render (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

