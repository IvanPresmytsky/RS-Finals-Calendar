import  { Day } from '../../../src/components/monthView/Day.js';
import React from 'react';

function setup(targetDate, events, day, id) {
  const props = {
    targetDate,
    events,
    day,
    id
  };

  const component = shallow(<Day {...props}/>);

  return {
    component,
    props
  };
}

describe('Day', () => {
  const targetDate = new Date(2016, 0, 1);
  const targetDate2 = new Date(2016, 1, 1);
  const events = [
                   { title: 'event1', text: 'text1', date: '2016-01-01', startTime: '12:00', endTime: '13:00' },
                   { title: 'event2', text: 'text2', date: '2016-01-01', startTime: '13:01', endTime: '14:02' },
                   { title: 'event3', text: 'text3', date: '2016-01-01', startTime: '14:00', endTime: '15:00' }
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
  
  it('should render self and subcomponents', () => {
    const { component}  = setup(targetDate, events, days[0], '2016-01-01');
    assert(component.hasClass('month-view__day'));
    assert(component.find('.day__day-number').hasClass('day__day-number'));
    assert.equal(component.find('.day__day-number').text(), days[0].getDate());
  });

});

