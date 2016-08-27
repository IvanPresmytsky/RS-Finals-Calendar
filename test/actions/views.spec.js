import { changeView } from '../../src/actions/views.js';
import { SET_VIEW_SCHEDULE } from '../../src/constants/actions.js';

describe('View actions', () => {
  it('should create an action to change view', () => {

    const expected = {
      type: SET_VIEW_SCHEDULE,
      currentView: SET_VIEW_SCHEDULE
    };

    const actual = changeView(SET_VIEW_SCHEDULE);

    expect(actual).to.deep.equal(expected);
  });
});
