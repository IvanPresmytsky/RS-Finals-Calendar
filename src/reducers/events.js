import { ADD_EVENT, TARGET_EVENT_FOR_CHANGE, CHANGE_EVENT, EVENT_DELETED } from '../constants/actions.js';

const initialState = {
  visibility: false,
  position: {top: 0, left: 0},
  defaultDate: null,
  events: [],
  eventForChange: null
}

function events (state = initialState, action) {
  let eventsArr;
  switch (action.type) {
    case ADD_EVENT:
      eventsArr = addEvent (state, action);
      return Object.assign({}, state, {events: eventsArr});
    case CHANGE_EVENT:
      eventsArr = state.events.slice();
      changeEvent(action);
      return Object.assign({}, state, {events: eventsArr});
    case TARGET_EVENT_FOR_CHANGE:
      return Object.assign({}, state, {eventForChange: action.event});
    case EVENT_DELETED:
      eventsArr = deleteEvent(state, action);
      return Object.assign({}, state, {events: eventsArr});
    default:
      return state;
  }
}

function addEvent (state, action) {
  let eventsArr = state.events.slice();
  if (eventsArr.length > 0 && eventsArr.indexOf(action.event) !== -1) {
    action.event.date = action.newDate;
  } else {
    eventsArr.push(action.event);
  }
  return eventsArr;
}

function deleteEvent (state, action) {
  return state.events.slice().filter((e) => {
     return e !== action.event;
   });
}

function changeEvent (action) {
  let event = action.event;
  let newEvent = action.newEvent;
  event.id = newEvent.id;
  event.title = newEvent.title;
  event.text = newEvent.text;
  event.date = newEvent.date;
  event.startTime = newEvent.startTime;
  event.endTime = newEvent.endTime,
  event.color = newEvent.color;
}

export default events;
