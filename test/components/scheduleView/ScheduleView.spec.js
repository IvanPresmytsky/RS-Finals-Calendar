import  { Schedule } from '../../../src/components/scheduleView/ScheduleView.js';
import React from 'react';


function setup(events, targetDate) {
  const props = {
    events,
    targetDate
  };

  const component = shallow(<Schedule {...props}/>);

  return {
    props,
    component
  };
}

describe('Schedule', () => {
  const events = [
    { title: 'event1', text: 'text1', date: '2016-01-01', startTime: '00:00', endTime: '00:00' },
    { title: 'event2', text: 'text2', date: '2016-02-01', startTime: '00:01', endTime: '00:02' },
    { title: 'event3', text: 'text3', date: '2016-01-13', startTime: '00:00', endTime: '00:00' }
  ];
  const targetDate = new Date(2016, 0, 1);

  it('should render', () => {
    const { component } = setup(events, targetDate);
    const pagination = component.find('.scedule__pagination');
    const eventList = component.find('.schedule__event-list');

    assert(component.hasClass('schedule'));
    assert(eventList.hasClass('schedule__event-list'));
    assert(pagination.hasClass('scedule__pagination'));
    assert(pagination.find('.pagination__next-btn').hasClass('pagination__next-btn'));
    assert.equal(pagination.find('.pagination__next-btn').text(), ' next ');
  });

});
