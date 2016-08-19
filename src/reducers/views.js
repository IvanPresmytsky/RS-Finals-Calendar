import { SET_VIEW_MONTH, SET_VIEW_SCHEDULE } from '../constants/actions.js';

export const initialState = {
  view: SET_VIEW_MONTH
}

function views (state = initialState, action) {
  switch (action.type) {
    case SET_VIEW_MONTH:
      return { 
               ...state, 
               view: action.currentView
             };
    case SET_VIEW_SCHEDULE:
      return { 
               ...state, 
               view: action.currentView
             };
    default:
      return state;
  }
}

export default views;
