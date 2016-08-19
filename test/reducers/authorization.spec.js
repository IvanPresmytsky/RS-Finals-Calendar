import { SIGN_IN } from '../../src/constants/authorization.js';

describe('Authorization reducer', () => {
  const reducer = require('../../src/reducers/authorization.js');
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
      type: SIGN_IN, 
      username: 'user',
      id: 1
    };

    const actual = reducer.default(undefined, action); 
    const expected = { 
      username: 'user',
      id: 1 
    };

    expect(actual).to.deep.equal(expected);
  });

});
