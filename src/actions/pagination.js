import date from '../utils/date.js';

import { SET_MONTH, SET_DAY, CHANGE_TARGET_DATE } from '../constants/actions.js';

export function changeTargetDate (option) {
  return {
    type: CHANGE_TARGET_DATE,
    option 
  }
}

