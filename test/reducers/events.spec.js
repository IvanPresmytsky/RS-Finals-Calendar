import deepFreeze from 'deep-freeze';
import { ADD_EVENT, EDIT_EVENT, SAVE_EVENT, DELETE_EVENT, INITIALIZE_EVENTS } from '../../src/constants/actions.js';

describe('Events reducer', () => {

  const reducer = require('../../src/reducers/events.js');
  const initialState = deepFreeze(reducer.initialState);

  it('should return the same state if action is unknown', () => { 
    const action = { type: 'UNKNOWN_ACTION' };
    const expected = initialState;
      
    const actual = reducer.default(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('should return initialState as default state', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const actual = reducer.default(undefined, action);
    const expected = initialState;

    expect(actual).to.deep.equal(expected);
  });

  describe('Initialize events action', () => {
    it('should return correct API', () => {
      const action = { 
        type: INITIALIZE_EVENTS, 
        events: [
                 { title: 'event', text: 'text', date: '01.01.2016', startTime: '00:00', endTime: '00:00' }, 
                 { title: 'new event', text: 'new text', date: '01.01.2017', startTime: '00:00', endTime: '01:00' }
                ]
      };

      const actual = reducer.default(undefined, action);
      const expected = { events: action.events, editedEvent: null };

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('Edit event action', () => {
    it('should return correct API', () => {
      const action = { 
        type: EDIT_EVENT, 
        editedEvent: { title: 'event', text: 'text', date: '01.01.2016', startTime: '00:00', endTime: '00:00' }
      };

      const actual = reducer.default(undefined, action); 
      const expected = { 
        events: [],
        editedEvent: action.event 
      };

      expect(actual).to.deep.equal(expected);
    });
  });
  
  describe('Add event action', () => {
    const addEvent = reducer.addEvent;

    it('should only change the event date if event is already in state.events array', () => {
      const event = { date: '01.01.2016' };
      const action = { type: ADD_EVENT, event: event, newDate: '01.01.2017' };
      const state = { events: [event], editedEvent: null };

      const expected = [ {date: '01.01.2017'} ];
      const actual = addEvent(state, action);

      expect(actual).to.deep.equal(expected);
    });

    it('should add to state.events new event', () => {
      const action = { type: ADD_EVENT, event: 2 };
      const state = { events: [1], editedEvent: null };

      const expected = [1, 2];
      const actual = addEvent(state, action);

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('Delete event action', () => {
    const deleteEvent = reducer.deleteEvent;

    it('should delete event from state.events', () => {
      const eventId = 2;
      const state = { events: [ {_id: 1}, {_id: 2} ], editedEvent: null };

      const expected = [ {_id: 1} ];
      const actual = deleteEvent(state, eventId);

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('Change event action', () => {
    const changeEvent = reducer.changeEvent;

    it('should change current event props to new event props', () => {
      const action = { 
        type: SAVE_EVENT, 
        event: { title: 'event', text: 'text', date: '01.01.2016', startTime: '00:00', endTime: '00:00' }, 
        newEvent: { title: 'new event', text: 'new text', date: '01.01.2017', startTime: '00:00', endTime: '01:00' } 
      };
      const state = { events: [action.event], editedEvent: null };

      const expected = [ action.newEvent ];
      const actual = changeEvent(state, action);

      expect(actual).to.deep.equal(expected);
    });
  });
  

});
