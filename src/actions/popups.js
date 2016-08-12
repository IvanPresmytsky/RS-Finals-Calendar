export const LOGIN_FORM_OPEN = 'LOGIN_FORM_OPEN';
export const LOGIN_FORM_CLOSE = 'LOGIN_FORM_CLOSE';
export const USER_MENU_OPEN = 'USER_MENU_OPEN';
export const USER_MENU_CLOSE = 'USER_MENU_CLOSE';
export const EDIT_USER_FORM_OPEN = 'EDIT_USER_FORM_OPEN';
export const EDIT_USER_FORM_CLOSE = 'EDIT_USER_FORM_CLOSE';
export const DELETE_USER_POPUP_OPEN = 'DELETE_USER_POPUP_OPEN';
export const DELETE_USER_POPUP_CLOSE = 'DELETE_USER_POPUP_CLOSE';
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
export const MESSAGE_POPUP_OPEN = 'MESSAGE_POPUP_OPEN';
export const MESSAGE_POPUP_CLOSE = 'MESSAGE_POPUP_CLOSE';

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

export function openUserMenu () {
  return {
    type: USER_MENU_OPEN
  };
}

export function closeUserMenu () {
  return {
    type: USER_MENU_CLOSE
  };
}

export function openEditUserForm () {
  return {
    type: EDIT_USER_FORM_OPEN
  };
}

export function closeEditUserForm () {
  return {
    type: EDIT_USER_FORM_CLOSE
  };
}

export function openDeleteUserPopup () {
  return {
    type: DELETE_USER_POPUP_OPEN
  };
}

export function closeDeleteUserPopup () {
  return {
    type: DELETE_USER_POPUP_CLOSE
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

export function openMessagePopup (message) {
  return {
    type: MESSAGE_POPUP_OPEN,
    message
  };
}

export function closeMessagePopup () {
  return {
    type: MESSAGE_POPUP_CLOSE,
  };
}
