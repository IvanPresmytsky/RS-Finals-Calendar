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
      console.log(response);
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem('token', data.token);
      console.log(sessionStorage);
      dispatch(initializeUser(data.user.username, data.user._id));
      dispatch(initializeEvents(data.user.events));
    })
    .catch((error) => {
       console.log(error);
    });
  }
}

export function signUp (signUpData) {
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/api/signup', {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(signUpData)
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem('token', data.token);
      console.log(sessionStorage);
      dispatch(initializeUser(data.user.username, data.user._id));
    })
    .catch((error) => {
       console.log(error);
    });
  }
}

export function editUser (editUserData, userId) {
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/api//users/' + userId + '/edit', {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(editUserData)
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

