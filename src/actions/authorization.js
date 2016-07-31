import { SIGN_IN } from '../constants/authorization.js';
import { INITIALIZE_EVENTS } from '../constants/actions.js';

export function initializeEvents (events) {
  return {
    type: INITIALIZE_EVENTS,
    events
  }
}

export function initializeUser (username, id) {
  return {
    type: SIGN_IN,
    username,
    id
  }
}

export function signIn (username, password) {
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/api/signin', {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(initializeUser(data.user.username, data.user._id));
      dispatch(initializeEvents(data.user.events));
    })
    .catch((error) => {
       console.log(error);
    });
  }
}

