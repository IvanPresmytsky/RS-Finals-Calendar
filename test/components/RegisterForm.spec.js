import { RegisterForm } from '../../src/components/RegisterForm.js';
import React from 'react';

function setup(visibility) {
  const props = {
    visibility
  };

  const component = shallow(<RegisterForm { ...props }/>);

  return {
    props,
    component
  };
}

describe('RegisterForm', () => {
  it('should render self and subcomponents', () => {
    const { component } = setup(true);

    const form = component.find('.register-form');
    const closeButton = component.find('.register-popup__close');

    assert(component.hasClass('register-popup'));
    assert(form.hasClass('register-form'));

    assert(form.find('.register-form__user').hasClass('register-form__user'));
    assert.equal(form.find('.register-form__user').props().placeholder, 'enter user name');
    assert(form.find('.register-form__password').hasClass('register-form__password'));
    assert.equal(form.find('.register-form__password').props().placeholder, 'enter password');
    assert(form.find('.register-form__confirm-password').hasClass('register-form__confirm-password'));
    assert.equal(form.find('.register-form__confirm-password').props().placeholder, 'confirm password');
    assert(form.find('.register-form__submit').hasClass('register-form__submit'));
    assert.equal(form.find('.register-form__submit').props().value, 'register');
    assert(closeButton.hasClass('register-popup__close'));
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