import { combineReducers } from 'redux';

import pagination from'./pagination.js';
import events from'./events.js';
import views from'./views.js';
import popups from './popups.js';

export default combineReducers({
  pagination, 
  events,
  views,
  popups
});

