import { DeleteUserPopup } from '../../src/components/DeleteUserPopup.js';
import React from 'react';

function setup(visibility) {
  const props = {
    visibility
  };

  const component = shallow(<DeleteUserPopup { ...props }/>);

  return {
    props,
    component
  };
}

describe('DeleteUserPopup', () => {
  it('should render self and subcomponents', () => {
    const { component } = setup(true);

    const form = component.find('.delete-user-form');
    const closeButton = component.find('.delete-user-popup__close');

    assert(component.hasClass('delete-user-popup'));
    assert(form.hasClass('delete-user-form'));
    assert(form.find('.delete-user-form__password').hasClass('delete-user-form__password'));
    assert.equal(form.find('.delete-user-form__password').props().placeholder, 'enter password');
    assert(form.find('.delete-user-form__submit').hasClass('delete-user-form__submit'));
    assert.equal(form.find('.delete-user-form__submit').props().value, 'delete user');
    assert(closeButton.hasClass('delete-user-popup__close'));
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
});
