import  { Event } from '../../../src/components/monthView/Event.js';
import React from 'react';

function setup(event) {
  const props = {
    event
  };

  const component = shallow(<Event {...props}/>);

  return {
    component,
    props
  };
}

describe('Event', () => {

  const event = { title: 'event1', text: 'text1', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };

  it('should render', () => {
    const { component}  = setup(event);
    assert(component.hasClass('event-body'));
    assert(component.find('.event-title').hasClass('event-title'));
    assert.equal(component.find('.event-title').text(), event.title);
    assert(component.find('.event-time').hasClass('event-time'));
    assert.equal(component.find('.event-time').text(), event.startTime);
  });

});

