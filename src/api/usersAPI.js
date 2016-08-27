import { SIGN_IN, SIGN_OUT, SIGN_UP, DELETE_USER, EDIT_USER } from '../constants/authorization.js';
import * as request from '../utils/request.js';

export function generateResourcePath (option, userId) {
  const userPath = 'api/';
  switch (option) {
    case SIGN_IN:
      return `${userPath}signin`;
      break;
    case SIGN_OUT:
      return `${userPath}signout`;
      break;
    case SIGN_UP:
      return `${userPath}signup`;
      break;
    case DELETE_USER:
      return `${userPath}users/${userId}`;
      break;
    case EDIT_USER:
      return `${userPath}users/${userId}/edit`;
      break;
    default:
      return userPath;
  }
};

export function signIn(payload) {
  const resourcePath = generateResourcePath(SIGN_IN);

  return request.post(resourcePath, payload);
};

export function signUp(payload) {
  const resourcePath = generateResourcePath(SIGN_UP);

  return request.post(resourcePath, payload);
};

export function signOut() {
  const resourcePath = generateResourcePath(SIGN_OUT);

  return request.post(resourcePath);
};

export function deleteUser( payload, userId) {
  const resourcePath = generateResourcePath(DELETE_USER, userId);

  return request.remove(resourcePath, payload);
};

export function editUser(payload, userId) {
  const resourcePath = generateResourcePath(EDIT_USER, userId);

  return request.put(resourcePath, payload);
};
