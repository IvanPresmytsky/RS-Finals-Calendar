import date from '../utils/date.js';

import {SET_MONTH, SET_DAY} from '../constants/actions.js';

export function setMonth (index) {
  return {
    type: SET_MONTH,
    monthIndex: index,
    date: date.actualDate(SET_MONTH, index)
  };
}

export function setDay (index) {
  return {
    type: SET_DAY,
    dayIndex: index,
    date: date.actualDate(SET_DAY, index)
  };
}

