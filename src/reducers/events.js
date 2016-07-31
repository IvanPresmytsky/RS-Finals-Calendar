import { ADD_EVENT, EDIT_EVENT, SAVE_EVENT, DELETE_EVENT, INITIALIZE_EVENTS } from '../constants/actions.js';

const initialState = {
  events: [],
  editedEvent: null
}

function events (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case INITIALIZE_EVENTS:
      return {
               ...state,
               events: action.events
             };
    case ADD_EVENT:
      return { 
               ...state,
               events: addEvent(state, action)
             };
    case SAVE_EVENT:
      let eventsArr = state.events.slice();
      changeEvent(action);
      return { 
               ...state,
               events: eventsArr
             };
    case EDIT_EVENT:
      return { 
               ...state,
               editedEvent: action.event
             };
    case DELETE_EVENT:
      return {
               ...state,
               events: deleteEvent(state, action.eventId)
             };
    default:
      return state;
  }
}

function addEvent (state, action) {
  let eventsArr = state.events.slice();
  console.log(action.event);
  if (eventsArr.length > 0 && eventsArr.indexOf(action.event) !== -1) {
    action.event.date = action.newDate;
  } else {
    eventsArr.push(action.event);
  }
  return eventsArr;
}

function changeEvent (action) {
  let event = action.event;
  let newEvent = action.newEvent;

  event.title = newEvent.title;
  event.text = newEvent.text;
  event.date = newEvent.date;
  event.startTime = newEvent.startTime;
  event.endTime = newEvent.endTime;
}

function deleteEvent (state, eventId) {
  return state.events.slice().filter((event) => {
     return event._id !== eventId;
   });
}

export default events;
