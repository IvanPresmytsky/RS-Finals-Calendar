import { getTargetDate } from '../../src/utils/date.js';
import { CHANGE_TARGET_DATE } from '../../src/constants/actions.js';
import { TODAY, NEXT_MONTH, PREVIOUS_MONTH, NEXT_DAY, PREVIOUS_DAY} from '../../src/constants/pagination.js';
import fecha from 'fecha';
import deepFreeze from 'deep-freeze';


describe('Pagination reducer', () => {
  const reducer = require('../../src/reducers/pagination.js');
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
      type: CHANGE_TARGET_DATE, 
      option: TODAY,
    };
    const targetDate = getTargetDate(new Date(), action.option);
    const actualDate = reducer.default(undefined, targetDate).targetDate;
    const actual = fecha.format(actualDate, 'MMMM, YYYY');
    const expectedDate = fecha.format(targetDate, 'MMMM, YYYY');
    const expected = { 
      targetDate: expectedDate
    };

    expect(actual).to.equal(expected.targetDate);
  });

});
