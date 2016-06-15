import { ADD_EVENT, TARGET_EVENT_FOR_CHANGE, CHANGE_EVENT, DELETE_EVENT } from '../constants/actions.js';

export function addEvent (event, newDate) {
  return {
    type: ADD_EVENT,
    event,
    newDate
  };
}

export function deleteEvent (event) {
  return {
   type: DELETE_EVENT,
   event
  }
}

export function targetEventForChange (event) {
  return {
    type: TARGET_EVENT_FOR_CHANGE,
    event
  };
}

export function changeEvent (event, newEvent) {
  return {
    type: CHANGE_EVENT,
    event,
    newEvent
  };
}

