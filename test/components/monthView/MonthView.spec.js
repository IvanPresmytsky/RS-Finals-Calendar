import  { MonthView } from '../../../src/components/monthView/MonthView.js';
import React from 'react';

function setup() {

  const component = shallow(<MonthView />);

  return component;
}

describe('MonthView', () => {
  it('should render', () => {
    const component = setup();
    assert(component.hasClass('month-view'));
  });

});

