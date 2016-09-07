import  { ScheduleEvent } from '../../../src/components/scheduleView/ScheduleEvent.js';
import React from 'react';


function setup(event) {
  const props = {
    event
  };

  const component = shallow(<ScheduleEvent {...props}/>);

  return {
    props,
    component
  };
}

describe('ScheduleEvent', () => {
  const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };

  it('should render', () => {
    const { component } = setup(event);
    const buttons = component.find('.schedule-buttons');

    assert(component.hasClass('schedule-event'));
    assert(component.find('.schedule-event__date').hasClass('schedule-event__date'));
    assert.equal(component.find('.schedule-event__date').text(), event.date);
    assert(component.find('.schedule-event__time').hasClass('schedule-event__time'));
    assert.equal(component.find('.schedule-event__time').text(), event.startTime + ' - ' + event.endTime);
    assert(component.find('.schedule-event__title').hasClass('schedule-event__title'));
    assert.equal(component.find('.schedule-event__title').text(), event.title);
    assert(component.find('.schedule-event__description').hasClass('schedule-event__description'));
    assert.equal(component.find('.schedule-event__description').text(), event.text);
    assert(buttons.hasClass('schedule-buttons'));
    assert(buttons.find('.schedule-buttons__change-btn').hasClass('schedule-buttons__change-btn'));
    assert.equal(buttons.find('.schedule-buttons__change-btn').text(), ' change event ');
    assert(buttons.find('.schedule-buttons__delete-btn').hasClass('schedule-buttons__delete-btn'));
    assert.equal(buttons.find('.schedule-buttons__delete-btn').text(), ' delete ');
  });

});
