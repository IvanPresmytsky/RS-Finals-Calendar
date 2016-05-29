import { EVENTS_CONTAINER_POPUP_OPEN, EVENTS_CONTAINER_POPUP_CLOSE } from '../constants/actions.js';

export function eventsContainerPopupOpen (id, position) {
  return {
    type: EVENTS_CONTAINER_POPUP_OPEN,
    visibility: true,
    dayId: id,
    position: position
  };
}

export function eventsContainerPopupClose () {
  return {
    type: EVENTS_CONTAINER_POPUP_CLOSE,
    visibility: false
  };
}
