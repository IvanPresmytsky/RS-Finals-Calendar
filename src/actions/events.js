import { ADD_EVENT_OPEN, ADD_EVENT_CLOSE, EVENT_ADDED, CHANGE_EVENT, EVENT_CHANGED, EVENT_DELETED } from '../constants/actions.js';

let eventsArr = [];

export function addEventOpen (position, date) {
  return {
    type: ADD_EVENT_OPEN,
    payLoad: true,
    position: position,
    defaultDate: date
  };
}

export function addEventClose () {
  return {
    type: ADD_EVENT_CLOSE,
    payLoad: false
  };
}

export function deleteEvent (event) {
  eventsArr = eventsArr.filter((e) => {
    return e !== event;
  });
  return {
   type: EVENT_DELETED,
   events: eventsArr
  }
}

export function eventAdded (event, newProps) {
  if (eventsArr.length > 0 && eventsArr.indexOf(event) !== -1) {
    event.date = newProps;
  } else {
    eventsArr.push(event);
  }
  console.log(eventsArr);
  return {
    type: EVENT_ADDED,
    events: eventsArr
  };
}

export function changeEvent (event) {
  return {
    type: CHANGE_EVENT,
    event: event
  };
}

export function eventChanged (event, newEvent) {

  event.id = newEvent.id;
  event.title = newEvent.title;
  event.text = newEvent.text,
  event.date = newEvent.date,
  event.startTime = newEvent.startTime,
  event.endTime = newEvent.endTime

  return {
    type: EVENT_CHANGED,
    events: eventsArr
  };
}

