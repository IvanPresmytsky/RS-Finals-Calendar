import date, { getTargetDate } from '../utils/date.js';

import { CHANGE_TARGET_DATE } from '../constants/actions.js';

export const initialState = {
  targetDate: new Date()
}

function pagination (state = initialState, action) {
  switch (action.type) {
    case CHANGE_TARGET_DATE:
      let targetDate = getTargetDate(state.targetDate, action.option);
      return { 
               ...state, 
               targetDate: targetDate
             };
    default:
      return state;
  }
}

export default pagination;
