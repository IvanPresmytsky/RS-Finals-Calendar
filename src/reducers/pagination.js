import date from '../utils/date.js';

import { SET_MONTH, SET_DAY } from '../constants/actions.js';

const initialState = {
  monthIndex: 0,
  dayIndex: 0,
  date: date.actualDate()
}

function calendarState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case SET_MONTH:
      return Object.assign({}, state, {monthIndex: action.monthIndex, date: action.date});
    case SET_DAY:
      return Object.assign({}, state, {dayIndex: action.dayIndex, date: action.date});
    default:
      return state;
  }
}

export default calendarState;
