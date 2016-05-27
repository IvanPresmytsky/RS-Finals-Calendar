import { SET_FILTER_MONTH, SET_FILTER_SCHEDULE } from '../constants/actions.js';

const initialState = {
  filter: SET_FILTER_MONTH
}

function calendarViewState (state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_MONTH:
      return Object.assign({}, state, {filter: action.currentFilter});
    case SET_FILTER_SCHEDULE:
      return Object.assign({}, state, {filter: action.currentFilter});
    default:
      return state;
  }
}

export default calendarViewState;
