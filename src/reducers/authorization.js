import { SIGN_IN, SIGN_OUT } from '../constants/authorization.js';

export const initialState = {
  username: null,
  id: null
}

function authorization (state = initialState, action) {
  switch(action.type){
    case SIGN_IN:
      return {
               ...state,
               username: action.username,
               id: action.id
             };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}

export default authorization;
