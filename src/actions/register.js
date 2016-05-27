import { REGISTER_OPEN, REGISTER_CLOSE } from '../constants/actions.js';

export function registerOpen () {
  return {
    type: REGISTER_OPEN,
    payLoad: true
  };
}

export function registerClose () {
  return {
    type: REGISTER_CLOSE,
    payLoad: false
  };
}
