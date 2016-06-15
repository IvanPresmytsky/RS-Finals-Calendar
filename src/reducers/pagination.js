import date, { getTargetDate } from '../utils/date.js';

import { CHANGE_TARGET_DATE } from '../constants/actions.js';

const initialState = {
  targetDate: new Date()
}

function pagination (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case CHANGE_TARGET_DATE:
      let targetDate = getTargetDate(state.targetDate, action.option);
      return { ...state, targetDate: targetDate};
    default:
      return state;
  }
}

export default pagination;
