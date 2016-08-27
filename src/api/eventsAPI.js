import * as request from '../utils/request.js';

export function generateResourcePath (userId, eventId) {
  let userPath = `api/users/${userId}`;
  let eventPath = eventId || '';
  return `${userPath}/events/${eventPath}`;
};

export function createEvent(userId, payload) {
  const resourcePath = generateResourcePath(userId);

  return request.post(resourcePath, payload);
};

export function editEvent(userId, eventId, payload) {
  const resourcePath = generateResourcePath(userId, eventId);

  return request.put(resourcePath, payload);
};

export function removeEvent(userId, eventId, payload) {
  const resourcePath = generateResourcePath(userId, eventId);

  return request.remove(resourcePath, payload);
};



