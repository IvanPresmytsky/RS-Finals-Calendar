import { combineReducers } from 'redux';

import pagination from'./pagination.js';
import addEvent from'./addEvent.js';
import logIn from'./logIn.js';
import register from'./register.js';
import calendarFilter from'./calendarFilter.js';
import eventsContainerPopup from './eventsContainerPopup.js';

export default combineReducers({
  pagination, 
  addEvent,
  logIn,
  register,
  calendarFilter,
  eventsContainerPopup
});

