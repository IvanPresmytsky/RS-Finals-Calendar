import { SET_MONTH, SET_DAY, CHANGE_TARGET_DATE } from '../constants/actions.js';
import { validateOption } from '../utils/actionsInputValidator.js';

export function changeTargetDate (option) {
  if (!validateOption(option)) throw new Error('uncorrect option')
  return {
    type: CHANGE_TARGET_DATE,
    option 
  }
}

