import { SIGN_IN } from '../constants/authorization.js';
import { INITIALIZE_EVENTS } from '../constants/actions.js';
import { openMessagePopup } from './popups.js'

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
      if (response.status === 404) {
        dispatch(openMessagePopup('Invalid username'));
      } else if (response.status === 401) {
        dispatch(openMessagePopup('Invalid password'));
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if(!data) return;
      sessionStorage.setItem('token', data.token);
      dispatch(initializeUser(data.user.username, data.user._id));
      dispatch(initializeEvents(data.user.events));
    })
    .catch((error) => {
       dispatch(openMessagePopup(error.toString()));
       console.log(error);
    });
  }
}

export function signUp (username, password) {
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/api/signup', {
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
      if (response.status === 201) {
        dispatch(signOut());
        dispatch(signIn(username, password));
      } else if (response.status === 300) {
        dispatch(openMessagePopup('This user is already exist!'));
      } else {
        console.log("response status is not equal to 201! It is: " + response.status);
      }
    })
    .catch((error) => {
       console.log(error);
    });
  }
}

export function signOut () {
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/api/signout', {
      method: 'post'
    })
    .then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('token', null);
        dispatch(initializeUser(null, null));
        dispatch(initializeEvents([]));
      } else {
        console.log("response status is not equal to 200! It is: " + response.status);
      }
    })
  }
}

export function deleteUser (password, userId) {
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/api/users/' + userId, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ 
        password: password,
        token: sessionStorage.token
      })
    })
    .then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('token', null);
        dispatch(initializeUser(null, null));
        dispatch(initializeEvents([]));
      } else if (response.status === 401) {
        dispatch(openMessagePopup('Invalid password!'));
      } else {
        console.log("response status is not equal to 200! It is: " + response.status);
      }
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
      if (response.status === 200) {
        dispatch(signIn(editUserData.newUsername, editUserData.newPassword));
      } else if (response.status === 300) {
        dispatch(openMessagePopup('This user is already exist!'));
      } else {
        console.log("response status is not equal to 200! It is: " + response.status);
      }
    })
    .catch((error) => {
       console.log(error);
    });
  }
}

