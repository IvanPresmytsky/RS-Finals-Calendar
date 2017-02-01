import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from'../reducers/rootReducer.js';

export function configureStore () {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}

