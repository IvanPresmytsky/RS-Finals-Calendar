import { SIGN_IN } from '../constants/authorization.js';
import { INITIALIZE_EVENTS } from '../constants/actions.js';
import { openMessagePopup } from './popups.js';
import { validateEvents, validateText } from '../utils/actionsInputValidator.js';
import * as usersAPI from '../api/usersAPI.js';

export function initializeEvents (events) {
  if (!validateEvents(events)) throw new Error('uncorrect events!');
  return {
    type: INITIALIZE_EVENTS,
    events
  }
}

export function initializeUser (username, id) {
  console.log(username !== null);
  if (username !== null && !validateText(username)) throw new Error('uncorrect username!');
  if (id !== null &&!validateText(id)) throw new Error('uncorrect id!');
  return {
    type: SIGN_IN,
    username,
    id
  }
}

export function signIn (username, password) {
  if (!validateText(username)) throw new Error('uncorrect username!');
  if (!validateText(password)) throw new Error('uncorrect password!');
  let payload = {
    username: username,
    password: password
  };
  return (dispatch, getState) => {
    return usersAPI.signIn(payload)
    .then((data) => {
      if(!data) return;
      sessionStorage.setItem('token', data.token);
      dispatch(initializeUser(data.user.username, data.user._id));
      dispatch(initializeEvents(data.user.events));
    }, (error) => {
      console.error(error);
      if(error.toString() === 'Error: 404') {
        dispatch(openMessagePopup('invalid user'));
      } else if (error.toString() === 'Error: 401') {
        dispatch(openMessagePopup('invalid password'));
      }
    });
  }
}

export function signOut () {
  return (dispatch, getState) => {
    return usersAPI.signOut()
      .then((date) => {
        sessionStorage.setItem('token', null);
        dispatch(initializeUser(null, null));
        dispatch(initializeEvents([]));
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function signUp (username, password) {
  if (!validateText(username)) throw new Error('uncorrect username!');
  if (!validateText(password)) throw new Error('uncorrect password!');
  let payload = {
    username: username,
    password: password
  };
  return (dispatch, getState) => {
    return usersAPI.signUp(payload)
      .then((data) => {
        if (data === '300') {
          dispatch(openMessagePopup('This user is already exist!'));
        } else {
          dispatch(signOut());
          dispatch(signIn(username, password));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function deleteUser (password, userId) {
  if (!validateText(userId)) throw new Error('uncorrect userId!');
  if (!validateText(password)) throw new Error('uncorrect password!');
  let payload = {
    password: password,
    token: sessionStorage.token
  };
  return (dispatch, getState) => {
    return usersAPI.deleteUser(payload, userId)
      .then((data) => {
        sessionStorage.setItem('token', null);
        dispatch(initializeUser(null, null));
        dispatch(initializeEvents([]));
      })
      .catch((error) => {
        dispatch(openMessagePopup('Invalid password!'));
        console.error(error);
      });
  }
}

export function editUser (editUserData, userId) {
  if (!validateText(editUserData.newUsername)) throw new Error('uncorrect new username!');
  if (!validateText(editUserData.password)) throw new Error('uncorrect password!');
  if (!validateText(editUserData.newPassword)) throw new Error('uncorrect new password!');
  if (!validateText(editUserData.confirmedNewPassword)) throw new Error('uncorrect confirmed new password!');
  if (!validateText(userId)) throw new Error('uncorrect userId!');
  return (dispatch, getState) => {
    return usersAPI.editUser(editUserData, userId)
      .then((data) => {
        if (data === '300') {
          dispatch(openMessagePopup('This user is already exist!'));
        } else {
          dispatch(signIn(editUserData.newUsername, editUserData.newPassword));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}





