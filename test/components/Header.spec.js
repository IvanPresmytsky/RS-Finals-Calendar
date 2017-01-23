import  { Header } from '../../src/components/Header.js';
import React from 'react';
import styles from '../../application.css';

function setup(username) {
  const props = {
    username
  };

  const component = shallow(<Header { ...props }/>);

  return {
    props,
    component
  };
}

describe('Header', () => {
  it('should render', () => {
    const { component } = setup('User');
    assert(component.hasClass('main-header'));
    assert(component.find('.main-title').hasClass('main-title'));
    assert.equal(component.find('.main-title').text(), 'Calendar');
    assert(component.find('.main-nav').hasClass('main-nav'));
    assert(component.find('.login-btn').hasClass('login-btn'));
    assert(component.find('.register-btn').hasClass('register-btn'));
    assert.equal(component.find('.register-btn').text(), 'register');
  });

  it('should have login-btn text "User" if username is "User"', () => {
    const { component } = setup('User');
    assert.equal(component.find('.login-btn').text(), 'User');
  });

  it('should have login-btn text "log in" if username is not defined', () => {
    const { component } = setup();
    assert.equal(component.find('.login-btn').text(), 'log in');
  });

});
