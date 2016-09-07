import  { DayEventsPopup } from '../../../src/components/monthView/DayEventsPopup.js';
import React from 'react';

function setup(visibility, events, position, dayId) {
  const props = {
    visibility,
    events,
    position,
    dayId
  };

  const component = shallow(<DayEventsPopup {...props}/>);

  return {
    component,
    props
  };
}

describe('DayEventsPopup', () => {

  const events = [
                   { title: 'event1', text: 'text1', date: '2016-01-01', startTime: '12:00', endTime: '13:00' },
                   { title: 'event2', text: 'text2', date: '2016-01-01', startTime: '13:01', endTime: '14:02' },
                   { title: 'event3', text: 'text3', date: '2016-01-01', startTime: '14:00', endTime: '15:00' }
                 ];
  const position = { top: 0, left: 0};
  const dayId = '2016-01-01';

  it('should render', () => {
    const { component}  = setup(true, events, position, dayId);
    assert(component.hasClass('day-events-popup'));
    assert(component.find('.day-events-popup__date').hasClass('day-events-popup__date'));
    assert.equal(component.find('.day-events-popup__date').text(), dayId);
    assert(component.find('.day-events-popup__close').hasClass('day-events-popup__close'));
    assert.equal(component.find('.day-events-popup__close').text(), 'X');
  });

  it('should have class "day-events-popup--visible" if visibility is true', () => {
    const { component } = setup(true, events, position, dayId);
    assert(component.hasClass('day-events-popup--visible'));
  });

  it('should have no class "day-events-popup--visible" if visibility is false', () => {
    const { component } = setup(false, events, position);
    assert.isFalse(component.hasClass('day-events-popup--visible'));
  });

});
