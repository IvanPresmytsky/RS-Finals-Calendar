import  { MonthBody } from '../../../src/components/monthView/MonthBody.js';
import React from 'react';

function setup(targetDate, events) {
  const props = {
    targetDate,
    events
  };

  const component = shallow(<MonthBody {...props}/>);

  return {
    component,
    props
  };
}

describe('MonthBody', () => {
  const targetDate = new Date(2016, 0, 1);
  const events = [
    { title: 'event1', text: 'text1', date: '2016-01-01', startTime: '00:00', endTime: '00:00' },
    { title: 'event2', text: 'text2', date: '2016-02-01', startTime: '00:01', endTime: '00:02' },
    { title: 'event3', text: 'text3', date: '2016-01-13', startTime: '00:00', endTime: '00:00' }
  ];
  
  it('should render', () => {
    const { component}  = setup(targetDate, events);
    assert(component.hasClass('month-body'));
  });

});

