import { createStore } from 'redux';

import rootReducer from'../reducers/rootReducer.js';

export function configureStore () {
  let store = createStore(rootReducer);
  return store;
}

