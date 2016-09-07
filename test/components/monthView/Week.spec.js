import  { Week } from '../../../src/components/monthView/Week.js';
import React from 'react';

function setup(targetDate, events, days) {
  const props = {
    targetDate,
    events,
    days
  };

  const component = shallow(<Week {...props}/>);

  return {
    component,
    props
  };
}

describe('Week', () => {
  const targetDate = new Date(2016, 0, 1);
  const events = [
                   { title: 'event1', text: 'text1', date: '2016-01-01', startTime: '00:00', endTime: '00:00' },
                   { title: 'event2', text: 'text2', date: '2016-01-02', startTime: '00:01', endTime: '00:02' },
                   { title: 'event3', text: 'text3', date: '2016-01-03', startTime: '00:00', endTime: '00:00' }
                 ];
  const days = [ 
                 new Date(2016, 0, 1), 
                 new Date(2016, 0, 2), 
                 new Date(2016, 0, 3), 
                 new Date(2016, 0, 4), 
                 new Date(2016, 0, 5), 
                 new Date(2016, 0, 6), 
                 new Date(2016, 0, 7)
               ];
  
  it('should render', () => {
    const { component}  = setup(targetDate, events, days);
    assert(component.hasClass('month-view__week'));
  });

});
