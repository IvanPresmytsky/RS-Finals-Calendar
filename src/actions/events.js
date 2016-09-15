import { ADD_EVENT, EDIT_EVENT, SAVE_EVENT, DELETE_EVENT } from '../constants/actions.js';
import * as eventsAPI from '../api/eventsAPI.js';
import { validateEvent, validateText, validateDate } from '../utils/actionsInputValidator.js';

export function eventAdded (event, newDate) {
  if (!validateEvent(event)) throw new Error('uncorrect event!');
  if (newDate) {
    if (!validateDate(newDate)) throw new Error('uncorrect newDate');
  }
  return {
    type: ADD_EVENT,
    event,
    newDate
  };
}

export function addEvent (event, userId, newDate) {
  if (!validateEvent(event)) throw new Error('uncorrect event!');
  if (!validateText(userId)) throw new Error('uncorrect userId!');
  if (newDate) {
    if(!validateDate(newDate)) throw new Error('uncorrect newDate');
  }
  let payload = {
    event,
    token: sessionStorage.token
  }
  return (dispatch, getState) => {
    return eventsAPI.createEvent(userId, payload)
      .then((data) => dispatch(eventAdded(data.event, newDate)))
      .catch((error) => {
        console.error(error);
      });
  }
}

export function eventSaved (event, newEvent) {
  return {
    type: SAVE_EVENT,
    event,
    newEvent
  };
}

export function saveEvent (event, newEvent, userId) {
  if (!validateEvent(event)) throw new Error('uncorrect event!');
  if (!validateEvent(newEvent)) throw new Error('uncorrect newEvent!');
  if (!validateText(userId)) throw new Error('uncorrect userId!');
  let payload = {
    event: newEvent,
    token: sessionStorage.token
  };
  return (dispatch, getState) => {
    return eventsAPI.editEvent(userId, event._id, payload)
    .then((response) => dispatch(eventSaved(event, newEvent)))
    .catch((error) => {
       console.error(error);
    });
  }
}
export function eventDeleted (eventId) {
  if (!validateText(eventId)) throw new Error('uncorrect eventId!');
  return {
   type: DELETE_EVENT,
   eventId
  }
}

export function deleteEvent (event, userId) {
  if (!validateEvent(event)) throw new Error('uncorrect event!');
  if (!validateText(userId)) throw new Error('uncorrect userId!');

  let payload = {
    token: sessionStorage.token
  };
  return (dispatch, getState) => {
    return eventsAPI.removeEvent(userId, event._id, payload)
      .then((data) => {
        dispatch(eventDeleted(event._id));
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function editEvent (event) {
  if (event) {
    if (!validateEvent(event)) throw new Error('uncorrect event!');
  }
  return {
    type: EDIT_EVENT,
    event
  };
}



