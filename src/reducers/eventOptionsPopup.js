import { EVENT_OPTIONS_POPUP_OPEN, EVENT_OPTIONS_POPUP_CLOSE } from '../constants/actions.js';

const initialState = {
  visibility: false,
  optionsPopupEvent: null,
  position: {top: 0, left: 0}
}

function setEventOptionsPopupState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case EVENT_OPTIONS_POPUP_OPEN:
      //let event = Object.assign({}, action.event);
      console.log(action.event);
      return Object.assign({}, state, {visibility: action.visibility,  optionsPopupEvent: action.event, position: action.position});
    case EVENT_OPTIONS_POPUP_CLOSE:
      return Object.assign({}, state, {visibility: action.visibility});
    default:
      return state;
  }
}

export default setEventOptionsPopupState;
