import { REGISTER_OPEN, REGISTER_CLOSE } from '../constants/actions.js';

const initialState = {
  visibility: false
}

function addRegisterFormState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case 'REGISTER_OPEN':
      return Object.assign({}, state, {visibility: action.payLoad});
    case 'REGISTER_CLOSE':
      return Object.assign({}, state, {visibility: action.payLoad});
    default:
      return state;
  }
}

export default addRegisterFormState;
