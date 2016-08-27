import { NEXT_MONTH, PREVIOUS_MONTH, NEXT_DAY, PREVIOUS_DAY, TODAY } from '../constants/pagination.js';

export function validateDate (date) {
  if (!date) return;
  let result = /[0-9]{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1]))/.test(date);
  return result;
}

export function validateTime (time) {
  if(!time) return;
  let result = /(([0-1][0-9])|(2[0-3])):([0-5][0-9])/.test(time);
  return result;
}

export function validateText (text) {
  if (!text) return;
  if (typeof text !== 'string') return;
  text = text.trim();
  return !!text;
}

export function validatePosition (position) {
  const defaultPosition = { top: 0, left: 0 };
  if (!position) return defaultPosition;
  if (!(position.top && position.left && position.top >= 0 && position.left >= 0)) return defaultPosition;
  return position;
}

export function validateEvent (event) {
  if (!event) return;
  return (event.hasOwnProperty('title') && validateText(event.title)) && 
         (event.hasOwnProperty('date') && validateDate(event.date)) &&
         (event.hasOwnProperty('startTime') && validateTime(event.startTime));
}

export function validateOption (option) {
  console.log(option);
  if (!option) return;
  const options = [NEXT_MONTH, PREVIOUS_MONTH, NEXT_DAY, PREVIOUS_DAY, TODAY];
  return options.indexOf(option) !== -1;
}

export function validateEvents (events) {
  if(!events) return;
  return Array.isArray(events) 
      && events.every((event) => {
           return validateEvent(event);
         });
}
