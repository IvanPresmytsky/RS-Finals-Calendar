import  { MonthHeader } from '../../../src/components/monthView/MonthHeader.js';
import React from 'react';

function setup() {

  const component = shallow(<MonthHeader />);

  return component;
}

describe('MonthHeader', () => {
  it('should render self and subcomponents', () => {
    const component = setup();
    assert(component.hasClass('month-header'));
    assert.equal(component.find('.month-header__day-name').length, 7);
    assert.equal(component.find('.day-name-holiday').length, 2);
    assert.equal(component.find('.month-header__day-name-text').length, 7);
  });

});

