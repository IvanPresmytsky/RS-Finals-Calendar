import { combineReducers } from 'redux';

import pagination from'./pagination';
import events from'./events';
import views from'./views';
import popup_reducer from '../components/popups/popup_reducer';
import authorization from './authorization'

export default combineReducers({
  pagination, 
  events,
  views,
  popup_reducer,
  authorization
});

