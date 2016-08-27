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
  validateText(username);
  if (!validateText(username)) throw new Error('uncorrect username!');
  if (!validateText(id)) throw new Error('uncorrect id!');
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
    /*.then((response) => {
      if (response.status === 404) {
        dispatch(openMessagePopup('Invalid username'));
      } else if (response.status === 401) {
        dispatch(openMessagePopup('Invalid password'));
      } else {
        return response.json();
      }
    })*/
    .then((data) => {
      if(!data) return;
      sessionStorage.setItem('token', data.token);
      dispatch(initializeUser(data.user.username, data.user._id));
      dispatch(initializeEvents(data.user.events));
    }, (error) => {
      console.log(error);
    })
    .catch((error) => {
       console.log(error);
       dispatch(openMessagePopup(error.toString()));
       console.error(error);
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
        dispatch(signOut());
        dispatch(signIn(username, password));
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
        dispatch(signIn(editUserData.newUsername, editUserData.newPassword));
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

/*
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
*/

/*
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
*/


/*
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
      console.log(response);
      if (response.status === 201) {
        //dispatch(signOut());
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
}*/




/*
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
*/

/*
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
*/



