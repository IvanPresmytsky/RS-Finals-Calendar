export const LOGIN_FORM_OPEN = 'LOGIN_FORM_OPEN';
export const LOGIN_FORM_CLOSE = 'LOGIN_FORM_CLOSE';
export const REGISTER_FORM_OPEN = 'REGISTER_FORM_OPEN';
export const REGISTER_FORM_CLOSE = 'REGISTER_FORM_CLOSE';
export const ADD_EVENT_FORM_OPEN = 'ADD_EVENT_FORM_OPEN';
export const ADD_EVENT_FORM_CLOSE = 'ADD_EVENT_FORM_CLOSE';
export const EVENT_MENU_OPEN = 'EVENT_MENU_OPEN';
export const EVENT_MENU_CLOSE = 'EVENT_MENU_CLOSE';
export const DAY_EVENTS_POPUP_OPEN = 'DAY_EVENTS_POPUP_OPEN';
export const DAY_EVENTS_POPUP_CLOSE = 'DAY_EVENTS_POPUP_CLOSE';
export const NOTIFICATION_POPUP_OPEN = 'NOTIFICATION_POPUP_OPEN';
export const NOTIFICATION_POPUP_CLOSE = 'NOTIFICATION_POPUP_CLOSE';

export function openLoginForm () {
  return {
    type: LOGIN_FORM_OPEN
  };
}

export function closeLoginForm () {
  return {
    type: LOGIN_FORM_CLOSE
  };
}

export function openRegisterForm () {
  return {
    type: REGISTER_FORM_OPEN
  };
}

export function closeRegisterForm () {
  return {
    type: REGISTER_FORM_CLOSE
  };
}

export function openAddEventForm (position, date) {
  return {
    type: ADD_EVENT_FORM_OPEN,
    position,
    defaultDate: date
  };
}

export function closeAddEventForm () {
  return {
    type: ADD_EVENT_FORM_CLOSE
  };
}

export function openEventMenu (event, position) {
  return {
    type: EVENT_MENU_OPEN,
    event: event,
    position: position
  };
}

export function closeEventMenu () {
  return {
    type: EVENT_MENU_CLOSE
  };
}

export function openDayEventsPopup (id, position) {
  console.log(id);
  console.log(position);
  return {
    type: DAY_EVENTS_POPUP_OPEN,
    dayId: id,
    position: position
  };
}

export function closeDayEventsPopup () {
  return {
    type: DAY_EVENTS_POPUP_CLOSE
  };
}

export function openNotificationPopup (event) {
  return {
    type: NOTIFICATION_POPUP_OPEN,
    event
  };
}

export function closeNotificationPopup () {
  return {
    type: NOTIFICATION_POPUP_CLOSE,
  };
}
