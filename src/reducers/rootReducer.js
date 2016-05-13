var Redux = require('redux');
var monthBody = require('./monthBody.js');
var addEvent = require('./addEvent.js');
var logIn = require('./logIn.js');
var register = require('./register.js');

module.exports = Redux.combineReducers({
  monthBody, 
  addEvent,
  logIn,
  register
});

