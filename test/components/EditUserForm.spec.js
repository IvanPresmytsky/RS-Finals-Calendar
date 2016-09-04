import { EditUserForm } from '../../src/components/EditUserForm.js';
import React from 'react';

function setup(visibility) {
  const props = {
    visibility
  };

  const component = shallow(<EditUserForm { ...props }/>);

  return {
    props,
    component
  };
}

describe('EditUserForm', () => {
  it('should render self and subcomponents', () => {
    const { component } = setup(true);

    const form = component.find('.edit-user-form');
    const closeButton = component.find('.edit-user-popup__close');

    assert(component.hasClass('edit-user-popup'));
    assert(form.hasClass('edit-user-form'));
    assert(form.find('.edit-user-form__password').hasClass('edit-user-form__password'));
    assert.equal(form.find('.edit-user-form__password').props().placeholder, 'enter password');
    assert(form.find('.edit-user-form__new-password').hasClass('edit-user-form__new-password'));
    assert.equal(form.find('.edit-user-form__new-password').props().placeholder, 'enter new password');
    assert(form.find('.edit-user-form__confirm-password').hasClass('edit-user-form__confirm-password'));
    assert.equal(form.find('.edit-user-form__confirm-password').props().placeholder, 'confirm new password');
    assert(form.find('.edit-user-form__new-username').hasClass('edit-user-form__new-username'));
    assert.equal(form.find('.edit-user-form__new-username').props().placeholder, 'enter new username');
    assert(form.find('.edit-user-form__submit').hasClass('edit-user-form__submit'));
    assert.equal(form.find('.edit-user-form__submit').props().value, 'edit user');
    assert(closeButton.hasClass('edit-user-popup__close'));
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
