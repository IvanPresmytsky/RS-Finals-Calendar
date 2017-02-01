import { OPEN_POPUP,
         CLOSE_POPUP } from './popups_actions';

export const initialState = {
  isPopupOpen: false,
  popupType: 'MESSAGE_POPUP',
  popupOptions: {},

};

function popups (state = initialState, action) {
  switch (action.type) {
    case OPEN_POPUP:
      return {
               ...state,
               isPopupOpen: true,
               popupType: action.popupType,
               popupOptions: action.popupOptions || {},
             };
    case CLOSE_POPUP:
      return initialState;
    default:
      return state;
  }
}

export default popups;
