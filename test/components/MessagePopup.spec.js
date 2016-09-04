import { MessagePopup } from '../../src/components/MessagePopup.js';
import React from 'react';

function setup(visibility, message) {
  const props = {
    visibility,
    message
  };

  const component = shallow(<MessagePopup { ...props }/>);

  return {
    props,
    component
  };
}

describe('MessagePopup', () => {
  it('should render self and subcomponents', () => {
    const message = 'message'
    const { component } = setup(true, message);
    const closeButton = component.find('.message-popup__close');

    assert(component.hasClass('message-popup'));
    assert(component.find('.message-popup__message').hasClass('message-popup__message'));
    assert.equal(component.find('.message-popup__message').text(), message);
    assert(component.find('.message-popup__ok-btn').hasClass('message-popup__ok-btn'));
    assert.equal(component.find('.message-popup__ok-btn').text(), 'OK');
    assert(closeButton.hasClass('message-popup__close'));
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

  it('should render "no message" if message is not defined', () => {
    const { component } = setup(true);
    assert.equal(component.find('.message-popup__message').text(), 'no message');
  });
});
