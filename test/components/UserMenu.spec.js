import  { UserMenu } from '../../src/components/UserMenu.js';
import React from 'react';

function setup(visibility) {
  const props = {
    visibility
  };

  const component = shallow(<UserMenu { ...props }/>);

  return {
    props,
    component
  };
}

describe('UserMenu', () => {
  it('should render self and subcomponents', () => {
    const { component } = setup(true);
    assert(component.hasClass('user-menu-popup'));
    assert(component.find('.user-menu__edit-user-btn').hasClass('user-menu__edit-user-btn'));
    assert.equal(component.find('.user-menu__edit-user-btn').text(), 'edit user');
    assert(component.find('.user-menu__delete-user-btn').hasClass('user-menu__delete-user-btn'));
    assert.equal(component.find('.user-menu__delete-user-btn').text(), 'delete user');
    assert(component.find('.user-menu__sign-out-btn').hasClass('user-menu__sign-out-btn'));
    assert.equal(component.find('.user-menu__sign-out-btn').text(), 'sign out');
    assert(component.find('.user-menu__close-btn').hasClass('user-menu__close-btn'));
    assert.equal(component.find('.user-menu__close-btn').text(), 'close');
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

