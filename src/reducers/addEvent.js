import { ADD_EVENT_OPEN, ADD_EVENT_CLOSE, EVENT_ADDED, CHANGE_EVENT, EVENT_CHANGED, EVENT_DELETED } from '../constants/actions.js';

const initialState = {
  visibility: false,
  position: {top: 0, left: 0},
  defaultDate: null,
  events: [],
  eventForChange: null
}

function addEventState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case ADD_EVENT_OPEN:
      return Object.assign({}, state, {visibility: action.payLoad, position: action.position, defaultDate: action.defaultDate});
    case ADD_EVENT_CLOSE:
      return Object.assign({}, state, {visibility: action.payLoad});
    case EVENT_ADDED:
      return Object.assign({}, state, {events: action.events});
    case EVENT_CHANGED:
      return Object.assign({}, state, {events: action.events});
    case CHANGE_EVENT:
      return Object.assign({}, state, {eventForChange: action.event});
    case EVENT_DELETED:
      return Object.assign({}, state, {events: action.events});
    default:
      return state;
  }
}

export default addEventState;
