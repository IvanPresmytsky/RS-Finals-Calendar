import { ADD_EVENT, EDIT_EVENT, SAVE_EVENT, DELETE_EVENT, INITIALIZE_EVENTS } from '../../src/constants/actions.js';

describe('Events reducer', () => {

  const reducer = require('../../src/reducers/events.js');
  const initialState = deepFreeze(reducer.initialState);

  before(() => {console.log('testing started');});
  after(() => {console.log('testing finished');});

  describe('Common', () => {
    it('should return the same state if action is unknown', () => { 
      const action = { type: 'ANKNOWN_ACTION' };
      const expected = initialState;
      
      const actual = reducer.default(initialState, action);

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

    it('should add to state.events new event if action is ' + ADD_EVENT, () => {
      const action = { type: ADD_EVENT, event: 2 };
      const state = { events: [1], editedEvent: null };

      const expected = [1, 2];
      const actual = addEvent(state, action);

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('delete event action', () => {
    const deleteEvent = reducer.deleteEvent;

    it('should delete event from state.events if action is ' + DELETE_EVENT, () => {
      const eventId = 2;
      const state = { events: [ {_id: 1}, {_id: 2} ], editedEvent: null };

      const expected = [ {_id: 1} ];
      const actual = deleteEvent(state, eventId);

      expect(actual).to.deep.equal(expected);
    });
  });
  

});
