var Redux = require('redux');
var rootReducer = require('../reducers/rootReducer.js');
//var rootReducer = require('../reducers/monthBodyReducer.js');
//var rootReducer = require('../reducers/addEventReducer.js');

function configureStore () {
  var store = Redux.createStore(rootReducer);
  return store;
}

module.exports = configureStore;
