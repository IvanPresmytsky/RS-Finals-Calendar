import deepFreeze from 'deep-freeze';
import { SET_VIEW_MONTH, SET_VIEW_SCHEDULE } from '../../src/constants/actions.js';

describe('Views reducer', () => {
  const reducer = require('../../src/reducers/views.js');
  const initialState = deepFreeze(reducer.initialState);

  it('should return the same state if action is unknown', () => { 
    const action = { type: 'UNKNOWN_ACTION' };
    const expected = initialState;
      
    const actual = reducer.default(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('should return initialState as default state', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const actual = reducer.default(undefined, action);
    const expected = initialState;

    expect(actual).to.deep.equal(expected);
  });

  it('should return correct API', () => {
    const action = {
      type: SET_VIEW_SCHEDULE,
      currentView: SET_VIEW_SCHEDULE
    };

    const actual = reducer.default(undefined, action); 
    const expected = { 
      view: SET_VIEW_SCHEDULE
    };

    expect(actual).to.deep.equal(expected);
  });

});
