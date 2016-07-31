import { SIGN_IN } from '../constants/authorization.js';

const initialState = {
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
    default:
      return state;
  }
}

export default authorization;
