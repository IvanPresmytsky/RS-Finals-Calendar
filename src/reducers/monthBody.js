var date = require('../utils/Date.js');


var initialState = {
  monthIndex: 0,
  date: date.actualDate()
}

function calendarState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case 'SET_MONTH':
      return Object.assign({}, state, {monthIndex: action.monthIndex, date: action.date});
    default:
      return state;
  }
}

module.exports = calendarState;
