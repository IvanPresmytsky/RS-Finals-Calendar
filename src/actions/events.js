import { ADD_EVENT_OPEN, ADD_EVENT_CLOSE, EVENT_ADDED, CHANGE_EVENT, EVENT_CHANGED, EVENT_DELETED } from '../constants/actions.js';


export function addEventOpen (position, date) {
  return {
    type: ADD_EVENT_OPEN,
    visibility: true,
    position,
    defaultDate: date
  };
}

export function addEventClose () {
  return {
    type: ADD_EVENT_CLOSE,
    visibility: false
  };
}

export function deleteEvent (event) {
  return {
   type: EVENT_DELETED,
   event
  }
}

export function eventAdded (event, newDate) {
  return {
    type: EVENT_ADDED,
    event,
    newDate
  };
}

export function changeEvent (event) {
  return {
    type: CHANGE_EVENT,
    event
  };
}

export function eventChanged (event, newEvent) {
  return {
    type: EVENT_CHANGED,
    event,
    newEvent
  };
}

