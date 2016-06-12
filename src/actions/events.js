import { ADD_EVENT, TARGET_EVENT_FOR_CHANGE, CHANGE_EVENT, EVENT_DELETED } from '../constants/actions.js';

export function eventAdded (event, newDate) {
  return {
    type: ADD_EVENT,
    event,
    newDate
  };
}

export function deleteEvent (event) {
  return {
   type: EVENT_DELETED,
   event
  }
}

export function changeEvent (event) {
  return {
    type: TARGET_EVENT_FOR_CHANGE,
    event
  };
}

export function eventChanged (event, newEvent) {
  return {
    type: CHANGE_EVENT,
    event,
    newEvent
  };
}

