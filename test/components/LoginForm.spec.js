import { LoginForm } from '../../src/components/LoginForm.js';
import React from 'react';

function setup(visibility) {
  const props = {
    visibility
  };

  const component = shallow(<LoginForm { ...props }/>);

  return {
    props,
    component
  };
}

describe('LoginForm', () => {
  it('should render self and subcomponents', () => {
    const { component } = setup(true);

    const form = component.find('.login-form');
    const closeButton = component.find('.login-popup__close');

    assert(component.hasClass('login-popup'));
    assert(form.hasClass('login-form'));
    assert(form.find('.login-form__user').hasClass('login-form__user'));
    assert.equal(form.find('.login-form__user').props().placeholder, 'enter user name');
    assert(form.find('.login-form__password').hasClass('login-form__password'));
    assert.equal(form.find('.login-form__password').props().placeholder, 'enter password');
    assert(form.find('.login-form__submit').hasClass('login-form__submit'));
    assert.equal(form.find('.login-form__submit').props().value, 'log in');
    assert(closeButton.hasClass('login-popup__close'));
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
