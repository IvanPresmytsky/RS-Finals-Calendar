import  { NavAndTools } from '../../src/components/NavAndTools.js';
import React from 'react';
import { SET_VIEW_MONTH, SET_VIEW_SCHEDULE } from '../../src/constants/actions.js';

function setup(view, targetDate) {
  const props = {
    view, 
    targetDate
  };

  const component = shallow(<NavAndTools { ...props }/>);

  return {
    props,
    component
  };
}

describe('NavAndTools', () => {
  it('should render self and subcomponents', () => {
    const { component } = setup(SET_VIEW_MONTH, new Date());
    const pagination = component.find('.nav-and-tools__pagination');
    const filters = component.find('.nav-and-tools__filters');

    assert(component.hasClass('nav-and-tools'));
    assert(pagination.hasClass('nav-and-tools__pagination'));
    assert(pagination.find('.add-task-btn').hasClass('add-task-btn'));
    assert.equal(pagination.find('.add-task-btn').text(), 'Add new event');
    assert(pagination.find('.prev-btn').hasClass('prev-btn'));
    assert.equal(pagination.find('.prev-btn').text(), ' prev ');
    assert(pagination.find('.today-btn').hasClass('today-btn'));
    assert.equal(pagination.find('.today-btn').text(), 'Today');
    assert(pagination.find('.next-btn').hasClass('next-btn'));
    assert.equal(pagination.find('.next-btn').text(), ' next ');
    assert(pagination.find('.current-date').hasClass('current-date'));
    assert(filters.hasClass('nav-and-tools__filters'));
    assert(filters.find('.month-btn').hasClass('month-btn'));
    assert.equal(filters.find('.month-btn').text(), ' month ');
    assert(filters.find('.schedule-btn').hasClass('schedule-btn'));
    assert.equal(filters.find('.schedule-btn').text(), ' schedule ');
  });

  it('should render correct date if view is ' + SET_VIEW_MONTH, () => {
    const date = new Date(2016, 0, 1);
    const { component } = setup(SET_VIEW_MONTH, date);
    assert.equal(component.find('.current-date').text(), 'January, 2016');
  });

  it('should render correct date if view is ' + SET_VIEW_SCHEDULE, () => {
    const date = new Date(2016, 0, 1);
    const { component } = setup(SET_VIEW_SCHEDULE, date);
    assert.equal(component.find('.current-date').text(), 'Friday January 1st, 2016');
  });

});
