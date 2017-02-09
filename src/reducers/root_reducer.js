import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import pagination from'./pagination';
import events from'./events';
import popupsReducer from '../components/popups/popup_reducer';
import authorization from './authorization'

const reducers = {
  pagination: pagination, 
  events: events,
  popups: popupsReducer,
  authorization: authorization,
  routing: routerReducer,
};

export default function createReducer() {
  return combineReducers({ ...reducers });
}
