import { NotificationPopup } from '../../src/components/NotificationPopup.js';
import React from 'react';

function setup(visibility, actualEvent) {
  const props = {
    visibility,
    actualEvent
  };

  const component = shallow(<NotificationPopup { ...props }/>);

  return {
    props,
    component
  };
}

describe('NotificationPopup', () => {
  const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
  it('should render self and subcomponents', () => {
    
    const { component } = setup(true, event);
    const closeButton = component.find('.notification-popup__close');

    assert(component.hasClass('notification-popup'));
    assert(component.find('.notification-popup__title').hasClass('notification-popup__title'));
    assert.equal(component.find('.notification-popup__title').text(), 'Attention!!!');
    assert(component.find('.notification-popup__event-title').hasClass('notification-popup__event-title'));
    assert.equal(component.find('.notification-popup__event-title').text(), event.title);
    
    assert(component.find('.notification-popup__event-text').hasClass('notification-popup__event-text'));
    assert.equal(component.find('.notification-popup__event-text').text(), event.text);

    assert(closeButton.hasClass('notification-popup__close'));
    assert.equal(closeButton.find('a').text(), 'X');
  });
  
  it('should have class "popup-visible" if visibility is true', () => {
    const { component } = setup(true);
    assert(component.hasClass('popup-visible'));
  });

  it('should have no class "popup-visible" if visibility is false', () => {
    const { component } = setup(false);
    assert.isFalse(component.hasClass('popup-visible'));
  });

  it('should render empty title and text if actualEvent is not defined', () => {
    const { component } = setup(true);
    assert.equal(component.find('.notification-popup__event-title').text(), '');
    assert.equal(component.find('.notification-popup__event-text').text(), '');
  });

});

