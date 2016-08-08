import { ADD_EVENT, EDIT_EVENT, SAVE_EVENT, DELETE_EVENT } from '../constants/actions.js';

export function eventAdded (event, newDate) {
  return {
    type: ADD_EVENT,
    event,
    newDate
  };
}

export function addEvent (event, userId, newDate) {
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/api/users/' + userId + '/events', {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
        body: JSON.stringify({ event: event, token: sessionStorage.token })
    })
    .then((response) => {
       return response.json();
    })
    .then((data) => dispatch(eventAdded(data.event)))
    .catch((error) => {
      console.log(error);
    });
  }
}

export function eventSaved (event, newEvent) {
  return {
    type: SAVE_EVENT,
    event,
    newEvent
  };
}

export function saveEvent (event, newEvent, userId) {
  let path = 'http://localhost:3000/api/users/' + userId + '/events/' + event._id;
  return (dispatch, getState) => {
    return fetch(path, {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({event: newEvent, token: sessionStorage.token})
    })
    .then((response) => {
      if (response.status === 201) {
        dispatch(eventSaved(event, newEvent));
      } else {
        console.log("response status is not equal to 201! It is: " + response.status);
      }
    })
    .catch((error) => {
       console.log(error);
    });
  }
}

export function eventDeleted (eventId) {
  return {
   type: DELETE_EVENT,
   eventId
  }
}

export function deleteEvent (event, userId) {
  return (dispatch, getState) => {
    return fetch('http://localhost:3000/api/users/' + userId + '/events/' + event._id, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ token: sessionStorage.token })
    })
    .then((response) => {
      if (response.status === 200) {
        dispatch(eventDeleted(event._id));
      } else {
        console.log("response status is not equal to 200! It is: " + response.status);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export function editEvent (event) {
  return {
    type: EDIT_EVENT,
    event
  };
}



