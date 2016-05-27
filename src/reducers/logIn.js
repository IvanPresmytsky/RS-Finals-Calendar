import { LOG_IN_OPEN, LOG_IN_CLOSE} from '../constants/actions.js';

const initialState = {
  visibility: false
}

function addLogInFormState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case LOG_IN_OPEN:
      return Object.assign({}, state, {visibility: action.payLoad});
    case LOG_IN_CLOSE:
      return Object.assign({}, state, {visibility: action.payLoad});
    default:
      return state;
  }
}

export default addLogInFormState;
