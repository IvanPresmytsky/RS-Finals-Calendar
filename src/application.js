require('./stylesheets/application.css');
var App = require('./components/Application.js');

var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var configureStore = require('./store/configureStore.js');
var Provider = ReactRedux.Provider;

var store = configureStore();
console.log(store);
ReactDOM.render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementsByClassName('root')[0]
);

