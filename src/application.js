import React from 'react';

import { Provider } from 'react-redux';
import { render } from 'react-dom';

import { configureStore } from './store/configureStore.js';

import App from './components/Application.js';

import './stylesheets/application.css';

let store = configureStore();

console.log(store);

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

