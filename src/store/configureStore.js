var Redux = require('redux');
var rootReducer = require('../reducers/reducer.js');

function configureStore (initialState) {
  var store = Redux.createStore(rootReducer, initialState);
  return store;
}

module.exports = configureStore;
