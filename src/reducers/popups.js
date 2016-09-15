import { LOGIN_FORM_OPEN,
         LOGIN_FORM_CLOSE,
         USER_MENU_OPEN,
         USER_MENU_CLOSE,
         EDIT_USER_FORM_OPEN,
         EDIT_USER_FORM_CLOSE,
         DELETE_USER_POPUP_OPEN,
         DELETE_USER_POPUP_CLOSE,
         REGISTER_FORM_OPEN,
         REGISTER_FORM_CLOSE,
         ADD_EVENT_FORM_OPEN,
         ADD_EVENT_FORM_CLOSE,
         EVENT_MENU_OPEN,
         EVENT_MENU_CLOSE,
         DAY_EVENTS_POPUP_OPEN,
         DAY_EVENTS_POPUP_CLOSE,
         NOTIFICATION_POPUP_OPEN,
         NOTIFICATION_POPUP_CLOSE,
         MESSAGE_POPUP_OPEN,
         MESSAGE_POPUP_CLOSE } from '../actions/popups';

export const initialState = {
  loginFormVisibility: false,
  userMenuVisibility: false,
  editUserFormVisibility: false,
  deleteUserPopupVisibility: false,
  registerFormVisibility: false,
  addEventFormVisibility: false,
  addEventFormPosition: {top: 0, left: 0},
  addEventFormDefaultDate: null,
  eventMenuVisibility: false,
  eventMenuPosition: {top: 0, left: 0},
  eventMenuTargetEvent: null,
  dayEventsPopupVisibility: false,
  dayEventsPopupPosition: {top: 0, left: 0},
  dayEventsPopupTargetDayId: null,
  notificationPopupVisibility: false,
  notificationPopupEvent: null,
  messagePopupVisibility: false,
  messagePopupMessage: null
};

function popups (state = initialState, action) {
  switch (action.type) {
    case LOGIN_FORM_OPEN:
      return { 
               ...state, 
               loginFormVisibility: true
             };
    case LOGIN_FORM_CLOSE:
      return { 
               ...state, 
               loginFormVisibility: false
             };
    case USER_MENU_OPEN:
      return { 
               ...state, 
               userMenuVisibility: true
             };
    case USER_MENU_CLOSE:
      return { 
               ...state, 
               userMenuVisibility: false
             };
    case EDIT_USER_FORM_OPEN:
      return { 
               ...state, 
               editUserFormVisibility: true
             };
    case EDIT_USER_FORM_CLOSE:
      return { 
               ...state, 
               editUserFormVisibility: false
             };
    case DELETE_USER_POPUP_OPEN:
      return { 
               ...state, 
               deleteUserPopupVisibility: true
             };
    case DELETE_USER_POPUP_CLOSE:
      return { 
               ...state, 
               deleteUserPopupVisibility: false
             };
    case REGISTER_FORM_OPEN:
      return { 
               ...state,
               registerFormVisibility: true
             };
    case REGISTER_FORM_CLOSE:
      return { 
               ...state,
               registerFormVisibility: false
             };
    case ADD_EVENT_FORM_OPEN:
      return { 
               ...state,
               addEventFormVisibility: true, 
               addEventFormPosition: action.position, 
               addEventFormDefaultDate: action.defaultDate
             };
    case ADD_EVENT_FORM_CLOSE:
      return { 
               ...state,
               addEventFormVisibility: false
             };
    case EVENT_MENU_OPEN:
      return { 
               ...state,
               eventMenuVisibility: true, 
               eventMenuTargetEvent: action.event, 
               eventMenuPosition: action.position
             };
    case EVENT_MENU_CLOSE:
      return { 
               ...state,
               eventMenuVisibility: false
             };
    case DAY_EVENTS_POPUP_OPEN:
      return { 
               ...state,
               dayEventsPopupVisibility: true, 
               dayEventsPopupTargetDayId: action.dayId, 
               dayEventsPopupPosition: action.position
             };
    case DAY_EVENTS_POPUP_CLOSE:
      return { 
               ...state,
               dayEventsPopupVisibility: false};
    case NOTIFICATION_POPUP_OPEN:
      return { 
               ...state,
               notificationPopupVisibility: true, 
               notificationPopupEvent: action.event
             };
    case NOTIFICATION_POPUP_CLOSE:
      return { 
               ...state,
               notificationPopupVisibility: false
             };
    case MESSAGE_POPUP_OPEN:
      return { 
               ...state,
               messagePopupVisibility: true, 
               messagePopupMessage: action.message
             };
    case MESSAGE_POPUP_CLOSE:
      return { 
               ...state,
               messagePopupVisibility: false
             };
    default:
      return state;
  }
}

export default popups;
