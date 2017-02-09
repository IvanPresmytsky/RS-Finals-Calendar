import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from'../reducers/root_reducer';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

const loggerMiddleware = createLogger();

function configureStore(initialState = {}, history) {
  const middlewares = [
    thunkMiddleware,
    routerMiddleware(history),
    loggerMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const store = createStore(
    createReducer(), 
    initialState, 
    compose(...enhancers)
  );

  return store;
}

export default configureStore;

