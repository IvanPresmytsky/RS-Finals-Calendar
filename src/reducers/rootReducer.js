var Redux = require('redux');
var monthBodyReducer = require('./monthBodyReducer.js');
var addEventReducer = require('./addEventReducer.js');

module.exports = Redux.combineReducers({monthBodyReducer, addEventReducer});

