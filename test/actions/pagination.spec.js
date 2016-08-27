import { changeTargetDate } from '../../src/actions/pagination.js';
import { CHANGE_TARGET_DATE } from '../../src/constants/actions.js';
import { NEXT_MONTH, PREVIOUS_MONTH, NEXT_DAY, PREVIOUS_DAY, TODAY } from '../../src/constants/pagination.js';

describe('Paginations actions', () => {
  it('should create an action to change target date', () => {
    const expected = {
      type: CHANGE_TARGET_DATE,
      option: NEXT_MONTH
    };

    const actual = changeTargetDate(NEXT_MONTH);

    expect(actual).to.deep.equal(expected);
  });

  it('should throw error if option is not correct', () => {
    const options = [ NEXT_MONTH, PREVIOUS_MONTH, NEXT_DAY, PREVIOUS_DAY, TODAY ];
    const uncorrectOption = 'UNCORRECT_OPTION';
    options.forEach((option) => {
      expect(() => changeTargetDate(option)).to.not.throw(Error);
    });

    expect(() => changeTargetDate(uncorrectOption)).to.throw(Error);
  });
});
