export const OPEN_POPUP = 'OPEN_POPUP';
export const CLOSE_POPUP = 'CLOSE_POPUP';
export const DELETE_USER_POPUP = 'DELETE_USER_POPUP';
export const MESSAGE_POPUP = 'MESSAGE_POPUP';
export const NOTIFICATION_POPUP = 'NOTIFICATION_POPUP';
export const ADD_EVENT_FORM = 'ADD_EVENT_FORM';
export const EDIT_USER_FORM = 'EDIT_USER_FORM';
export const EVENT_MENU = 'EVENT_MENU';
export const LOGIN_FORM = 'LOGIN_FORM';
export const REGISTER_FORM = 'REGISTER_FORM';


export function openPopup(popupType, popupOptions) {
  return {
    type: OPEN_POPUP,
    popupType,
    popupOptions,
  };
}

export function closePopup() {
  return {
    type: CLOSE_POPUP,
  };
}

