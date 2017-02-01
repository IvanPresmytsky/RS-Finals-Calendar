import React from 'react';

import { Provider } from 'react-redux';
import { render } from 'react-dom';

import { configureStore } from './store/configure_store.js';

import Calendar from './components/calendar.js';

import './application.css';

const store = configureStore();

render (
  <Provider store={store}>
    <Calendar />
  </Provider>,
  document.getElementById('root')
);

