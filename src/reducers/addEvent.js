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
  let eventsArr = state.events.slice();
  switch (action.type) {

    case ADD_EVENT_OPEN:
      return Object.assign({}, state, {visibility: action.visibility, position: action.position, defaultDate: action.defaultDate});

    case ADD_EVENT_CLOSE:
      return Object.assign({}, state, {visibility: action.visibility});

    case EVENT_ADDED:
      if (eventsArr.length > 0 && eventsArr.indexOf(action.event) !== -1) {
        console.log('change');
        action.event.date = action.newDate;
      } else {
        console.log('add');
        eventsArr.push(action.event);
      }
      return Object.assign({}, state, {events: eventsArr});

    case EVENT_CHANGED:
      let event = action.event;
      let newEvent = action.newEvent;
      event.id = newEvent.id;
      event.title = newEvent.title;
      event.text = newEvent.text,
      event.date = newEvent.date,
      event.startTime = newEvent.startTime,
      event.endTime = newEvent.endTime
      return Object.assign({}, state, {events: eventsArr});

    case CHANGE_EVENT:
      return Object.assign({}, state, {eventForChange: action.event});

    case EVENT_DELETED:
       eventsArr = eventsArr.filter((e) => {
         return e !== action.event;
       });
      return Object.assign({}, state, {events: eventsArr});

    default:
      return state;
  }
}

export default addEventState;
