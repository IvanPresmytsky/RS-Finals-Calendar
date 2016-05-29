import { EVENTS_CONTAINER_POPUP_OPEN, EVENTS_CONTAINER_POPUP_CLOSE } from '../constants/actions.js';

const initialState = {
  visibility: false,
  dayId: null,
  position: {top: 0, left: 0}
}

function setEventsContainerPopupState (state = initialState, action) {
  switch (action.type) {
    case EVENTS_CONTAINER_POPUP_OPEN:
      return Object.assign({}, state, {visibility: action.visibility, dayId: action.dayId, position: action.position});
    case EVENTS_CONTAINER_POPUP_CLOSE:
      return Object.assign({}, state, {visibility: action.visibility});
    default:
      return state;
  }
}

export default setEventsContainerPopupState;
