import  { App } from '../../src/components/Application.js';
import React from 'react';
import { SET_VIEW_MONTH, SET_VIEW_SCHEDULE } from '../../src/constants/actions.js';

function setup(view) {
  const props = {
    view
  };

  const component = shallow(<App {...props}/>);

  return {
    props,
    component
  };
}

describe('Application', () => {
  it('should render if view is ' + SET_VIEW_MONTH, () => {
    const { component } = setup(SET_VIEW_MONTH);
    assert(component.hasClass('container'));
    assert(component.find('.wrapper').hasClass('wrapper'));
  });

  it('should render if view is ' + SET_VIEW_SCHEDULE, () => {
    const { component } = setup(SET_VIEW_SCHEDULE);
    assert(component.hasClass('container'));
    assert(component.find('.wrapper').hasClass('wrapper'));
  });
});




