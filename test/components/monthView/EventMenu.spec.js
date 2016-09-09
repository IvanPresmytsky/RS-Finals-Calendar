import  { EventMenu } from '../../../src/components/monthView/EventMenu.js';
import React from 'react';

function setup(visibility, event, position) {
  const props = {
    visibility,
    event,
    position,
  };

  const component = shallow(<EventMenu {...props}/>);

  return {
    component,
    props
  };
}

describe('EventMenu', () => {

  const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '12:00', endTime: '13:00' };
  const position = { top: 0, left: 0};
  const userId = 'id';

  it('should render', () => {
    const { component}  = setup(true, event, position);
    const buttons = component.find('.event-menu-buttons');

    assert(component.hasClass('event-menu'));
    assert(component.find('.event-menu__title').hasClass('event-menu__title'));
    assert.equal(component.find('.event-menu__title').text(), event.title);
    assert(component.find('.event-menu__description').hasClass('event-menu__description'));
    assert.equal(component.find('.event-menu__description').text(), event.text);
    assert(component.find('.event-menu__date').hasClass('event-menu__date'));
    assert.equal(component.find('.event-menu__date').text(), event.date);
    assert(component.find('.event-menu__time').hasClass('event-menu__time'));
    assert.equal(component.find('.event-menu__time').text(), event.startTime + ' - ' + event.endTime);
    assert(buttons.hasClass('event-menu-buttons'));
    assert(buttons.find('.event-menu__change-btn').hasClass('event-menu__change-btn'));
    assert.equal(buttons.find('.event-menu__change-btn').text(), 'change event');
    assert(buttons.find('.event-menu__delete-btn').hasClass('event-menu__delete-btn'));
    assert.equal(buttons.find('.event-menu__delete-btn').text(), 'delete event');


    assert(component.find('.event-menu__close').hasClass('event-menu__close'));
    assert.equal(component.find('.event-menu__close').text(), 'X');
  });

  it('should have class "event-menu--visible" if visibility is true', () => {
    const { component } = setup(true, event, position);
    assert(component.hasClass('event-menu--visible'));
  });

  it('should have no class "event-menu--visible" if visibility is false', () => {
    const { component } = setup(false, event, position);
    assert.isFalse(component.hasClass('event-menu--visible'));
  });

  it('should render only buttons if event is not defined', () => {
    const { component } = setup(false, null, position);
    const buttons = component.find('.event-menu-buttons');
    
    assert.equal(component.find('.event-menu__title').text(), '');
    assert.equal(component.find('.event-menu__description').text(), '');
    assert.equal(component.find('.event-menu__date').text(), '');
    assert.equal(component.find('.event-menu__time').text(), '');
    assert(buttons.hasClass('event-menu-buttons'));
    assert(buttons.find('.event-menu__change-btn').hasClass('event-menu__change-btn'));
    assert.equal(buttons.find('.event-menu__change-btn').text(), 'change event');
    assert(buttons.find('.event-menu__delete-btn').hasClass('event-menu__delete-btn'));
    assert.equal(buttons.find('.event-menu__delete-btn').text(), 'delete event');
  });
});

