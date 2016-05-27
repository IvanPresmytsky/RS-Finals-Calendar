import { LOG_IN_OPEN, LOG_IN_CLOSE} from '../constants/actions.js';


export function logInOpen () {
  return {
    type: LOG_IN_OPEN,
    payLoad: true
  };
}

export function logInClose () {
  return {
    type: LOG_IN_CLOSE,
    payLoad: false
  };
}

