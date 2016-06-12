import { LOGIN_FORM_OPEN,
         LOGIN_FORM_CLOSE,
         REGISTER_FORM_OPEN,
         REGISTER_FORM_CLOSE,
         ADD_EVENT_FORM_OPEN,
         ADD_EVENT_FORM_CLOSE,
         EVENT_MENU_OPEN,
         EVENT_MENU_CLOSE,
         DAY_EVENTS_POPUP_OPEN,
         DAY_EVENTS_POPUP_CLOSE } from '../actions/popups';

const initialState = {
  loginFormVisibility: false,
  registerFormVisibility: false,
  addEventFormVisibility: false,
  addEventFormPosition: {top: 0, left: 0},
  addEventFormDefaultDate: null,
  eventMenuVisibility: false,
  eventMenuPosition: {top: 0, left: 0},
  eventMenuTargetEvent: null,
  dayEventsPopupVisibility: false,
  dayEventsPopupPosition: {top: 0, left: 0},
  dayEventsPopupTargetDayId: null
}

function popups (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case LOGIN_FORM_OPEN:
      return Object.assign({}, state, {loginFormVisibility: true});
    case LOGIN_FORM_CLOSE:
      return Object.assign({}, state, {loginFormVisibility: false});
    case REGISTER_FORM_OPEN:
      return Object.assign({}, state, {registerFormVisibility: true});
    case REGISTER_FORM_CLOSE:
      return Object.assign({}, state, {registerFormVisibility: false});
    case ADD_EVENT_FORM_OPEN:
      return Object.assign({}, state, {addEventFormVisibility: true, addEventFormPosition: action.position, addEventFormDefaultDate: action.defaultDate});
    case ADD_EVENT_FORM_CLOSE:
      return Object.assign({}, state, {addEventFormVisibility: false});
    case EVENT_MENU_OPEN:
      return Object.assign({}, state, {eventMenuVisibility: true, eventMenuTargetEvent: action.event, eventMenuPosition: action.position});
    case EVENT_MENU_CLOSE:
      return Object.assign({}, state, {eventMenuVisibility: false});
    case DAY_EVENTS_POPUP_OPEN:
      return Object.assign({}, state, {dayEventsPopupVisibility: true, dayId: action.dayId, position: action.position});
    case DAY_EVENTS_POPUP_CLOSE:
      return Object.assign({}, state, {dayEventsPopupVisibility: false});
    default:
      return state;
  }
}

export default popups;
