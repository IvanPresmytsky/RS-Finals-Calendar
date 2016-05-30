import { EVENT_OPTIONS_POPUP_OPEN, EVENT_OPTIONS_POPUP_CLOSE } from '../constants/actions.js';

export function eventOptionsPopupOpen (event, position) {
  return {
    type: EVENT_OPTIONS_POPUP_OPEN,
    visibility: true,
    event: event,
    position: position
  };
}

export function eventOptionsPopupClose () {
  return {
    type: EVENT_OPTIONS_POPUP_CLOSE,
    visibility: false
  };
}
