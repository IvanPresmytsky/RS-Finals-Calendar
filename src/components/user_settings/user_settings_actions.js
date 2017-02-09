import { SIGN_OUT } from '../../constants/authorization';
import { openMessagePopup } from '../popups/message_popup/message_popup_actions';
import { validateEvents, validateText } from '../../utils/actionsInputValidator';
import { push } from 'react-router-redux';
import * as usersAPI from '../../api/usersAPI';
import { initializeEvents, initializeUser, signIn, signOut } from '../../actions/authorization';

export function deleteUser (password, userId) {
  if (!validateText(userId)) throw new Error('uncorrect userId!');
  if (!validateText(password)) throw new Error('uncorrect password!');
  let payload = {
    password: password,
    token: sessionStorage.token
  };
  console.log(payload);
  return (dispatch, getState) => {
    return usersAPI.deleteUser(payload, userId)
      .then((data) => {
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('user', '');
        sessionStorage.setItem('userId', '');
        dispatch({type: SIGN_OUT});
        dispatch(initializeEvents([]));
        dispatch(push('/'));
      })
      .catch((error) => {
        dispatch(openMessagePopup({ message:'Invalid password!' }));
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
          dispatch(openMessagePopup({ message: 'This user is already exist!' }));
        } else {
          dispatch(signIn(editUserData.newUsername, editUserData.newPassword));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
