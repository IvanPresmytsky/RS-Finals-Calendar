import { SIGN_IN, SIGN_OUT } from '../constants/authorization';
import { INITIALIZE_EVENTS } from '../constants/actions';
import { openMessagePopup } from '../components/popups/message_popup/message_popup_actions';
import { push } from 'react-router-redux';
import { validateEvents, validateText } from '../utils/actionsInputValidator';
import * as usersAPI from '../api/usersAPI';
import * as eventsAPI from '../api/eventsAPI';

export function initializeEvents (events) {
  if (!validateEvents(events)) throw new Error('uncorrect events!');
  return {
    type: INITIALIZE_EVENTS,
    events
  }
}

export function loadEvents(id) {
  if (id !== null && !validateText(id)) throw new Error('uncorrect id!');
  return (dispatch, getState) => {
    return eventsAPI.getEvents(id) 
    .then((data) => {
      if(!data) return;
      dispatch(initializeEvents(data));
    }, (error) => {
      console.error(error);
      if(error.toString() === 'Error: 404') {
        dispatch(openMessagePopup({ message: 'invalid events' }));
      }
    });
  }
}

export function initializeUser (username, id) {
  if (username !== null && !validateText(username)) throw new Error('uncorrect username!');
  if (id !== null && !validateText(id)) throw new Error('uncorrect id!');
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
      sessionStorage.setItem('user', username);
      sessionStorage.setItem('userId', data.userId);
      dispatch(initializeUser(data.username, data.userId));
      dispatch(loadEvents(data.userId));
    })
    .catch((error) => {
      console.error(error);
      if(error.toString() === 'Error: 404') {
        dispatch(openMessagePopup({ message: 'invalid user' }));
      } else if (error.toString() === 'Error: 401') {
        dispatch(openMessagePopup({ message: 'invalid password' }));
      }
    });
  }
}

export function signOut () {
  return (dispatch, getState) => {
    return usersAPI.signOut()
      .then((date) => {
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('user', '');
        sessionStorage.setItem('userId', '');
        dispatch({type: SIGN_OUT});
        dispatch(initializeEvents([]));
        dispatch(push('/'));
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
          dispatch(openMessagePopup({ message:'This user is already exist!' }));
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






