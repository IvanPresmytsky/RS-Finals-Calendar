import { AddEventForm } from '../../src/components/AddEventForm.js';
import React from 'react';

function setup(visibility, defaultDate, editedEvent) {
  const props = {
    visibility,
    defaultDate,
    editedEvent
  };

  const component = shallow(<AddEventForm { ...props }/>);

  return {
    props,
    component
  };
}

describe('AddEventForm', () => {
  it('should render self and subcomponents', () => {
    const { component } = setup(true);

    const form = component.find('.add-event-form');
    const titleBlock = form.find('.add-event-form__title-block');
    const descriptionBlock = form.find('.add-event-form__description-block');
    const dateBlock = form.find('.add-event-form__date-block');
    const timeBlock = form.find('.add-event-form__time-block');
    const submitBlock = form.find('.add-event-form__submit-block');
    const closeButton = component.find('.add-event-popup__close');
    
    assert(component.hasClass('add-event-popup'));
    assert(form.hasClass('add-event-form'));

    assert(titleBlock.hasClass('add-event-form__title-block'));
    assert.equal(titleBlock.find('p').text(), 'event title');
    assert(titleBlock.find('.add-event-form__event-name').hasClass('add-event-form__event-name'));
    assert.equal(titleBlock.find('.add-event-form__event-name').props().placeholder, 'enter task name');
    assert.equal(titleBlock.find('.add-event-form__event-name').props().defaultValue, '');

    assert(descriptionBlock.hasClass('add-event-form__description-block'));
    assert.equal(descriptionBlock.find('p').text(), 'event description');
    assert(descriptionBlock.find('.add-event-form__event-description').hasClass('add-event-form__event-description'));
    assert.equal(descriptionBlock.find('.add-event-form__event-description').props().placeholder, 'enter task description');
    assert.equal(descriptionBlock.find('.add-event-form__event-description').props().defaultValue, '');

    assert(dateBlock.hasClass('add-event-form__date-block'));
    assert.equal(dateBlock.find('span').text('span'), 'event date');
    assert(dateBlock.find('.add-event-form__event-date').hasClass('add-event-form__event-date'));
    assert.equal(dateBlock.find('.add-event-form__event-date').props().required, 'required');
    assert.equal(dateBlock.find('.add-event-form__event-date').props().defaultValue, '');

    assert(timeBlock.hasClass('add-event-form__time-block'));
    assert.equal(timeBlock.find('.time-block__text-from').text(), 'from');
    assert(timeBlock.find('.add-event-form__event-start-time').hasClass('add-event-form__event-start-time'));
    assert.equal(timeBlock.find('.add-event-form__event-start-time').props().required, true);
    assert.equal(timeBlock.find('.add-event-form__event-start-time').props().defaultValue, '00:00');
    assert.equal(timeBlock.find('.time-block__text-to').text(), 'to');
    assert(timeBlock.find('.add-event-form__event-end-time').hasClass('add-event-form__event-end-time'));
    assert.equal(timeBlock.find('.add-event-form__event-end-time').props().defaultValue, '00:00');

    assert(submitBlock.hasClass('add-event-form__submit-block'));
    assert(form.find('.add-event-form__submit').hasClass('add-event-form__submit'));
    assert.equal(form.find('.add-event-form__submit').props().value, 'add event');

    assert(closeButton.hasClass('add-event-popup__close'));
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

  it('date block should have "block-hidden" class if defaultDate prop is defined', () => {
    const defaultDate = '2016-01-01';
    const { component } = setup(true, defaultDate);
    const dateInput = component.find('.add-event-form__event-date');

    assert(component.find('.add-event-form__date-block').hasClass('block-hidden'));
    assert(dateInput.hasClass('add-event-form__event-date'));
    assert.equal(dateInput.props().required, false);
    assert.equal(dateInput.props().defaultValue, '');
  });

  it('should render correct default values if editedEvent is defined', () => {
    const editedEvent = { title: 'event', text: 'text', date: '2016-01-01', startTime: '12:00', endTime: '13:00' };
    const { component } = setup(true, null, editedEvent);

    assert.equal(component.find('.add-event-form__event-name').props().defaultValue, editedEvent.title);
    assert.equal(component.find('.add-event-form__event-description').props().defaultValue, editedEvent.text);
    assert.equal(component.find('.add-event-form__event-date').props().defaultValue, editedEvent.date);
    assert.equal(component.find('.add-event-form__event-start-time').props().defaultValue, editedEvent.startTime);
    assert.equal(component.find('.add-event-form__event-end-time').props().defaultValue, editedEvent.endTime);
    assert.equal(component.find('.add-event-form__submit').props().value, 'change event');
  });

});

