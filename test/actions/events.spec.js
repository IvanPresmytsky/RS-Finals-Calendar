import { eventAdded, addEvent, eventSaved, saveEvent, eventDeleted, deleteEvent, editEvent } from '../../src/actions/events.js';
import { ADD_EVENT, EDIT_EVENT, SAVE_EVENT, DELETE_EVENT } from '../../src/constants/actions.js';

describe('Events actions', () => {
  describe('event added action', () => {
    it('should create an action to add new event', () => {
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const newDate = '2017-01-01';
      const expected = {
        type: ADD_EVENT,
        event,
        newDate
      };

      const actual = eventAdded(event, newDate);

      expect(actual).to.deep.equal(expected);
    });

    it('should trow error if event is not correct', () => {
      const newDate = '2017-01-01';
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventString = 'event';
      const eventUncorrect = { startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTitle = { title: '', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectDate = { title: 'title', text: 'text', date: '2016-01-35', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTime = { title: '', text: 'text', date: '2016-01-01', startTime: '00:60', endTime: '00:00' };

      expect(() => eventAdded(event)).to.not.throw(Error);
      expect(() => eventAdded(event, newDate)).to.not.throw(Error);
      expect(() => eventAdded()).to.throw(Error);
      expect(() => eventAdded(newDate, event)).to.throw(Error);
      expect(() => eventAdded(eventString)).to.throw(Error);
      expect(() => eventAdded(eventUncorrect)).to.throw(Error);
      expect(() => eventAdded(eventUncorrectTitle)).to.throw(Error);
      expect(() => eventAdded(eventUncorrectDate)).to.throw(Error);
      expect(() => eventAdded(eventUncorrectTime)).to.throw(Error);
    });

    it('should trow error if date is not correct', () => {
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const dateNumber = 20160101;
      const dateObject = { date: '2016-01-01'};
      const dateUncorrect = '2016-50-35';
      const dateCorrect = '2016-01-01';

      expect(() => eventAdded(event)).to.not.throw(Error);
      expect(() => eventAdded(event, dateNumber)).to.throw(Error);
      expect(() => eventAdded(event, dateUncorrect)).to.throw(Error);
      expect(() => eventAdded(event, dateObject)).to.throw(Error);
      expect(() => eventAdded(event, dateCorrect)).to.not.throw(Error);
    });
  });

  describe('add event action', () => {


    it('should trow error if event is not correct', () => {
      const id = 'id';
      const newDate = '2017-01-01';
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventString = 'event';
      const eventUncorrect = { startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTitle = { title: '', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectDate = { title: 'title', text: 'text', date: '2016-01-35', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTime = { title: '', text: 'text', date: '2016-01-01', startTime: '00:60', endTime: '00:00' };

      //expect(() => addEvent(event, id)).to.not.throw(Error);
      //expect(() => addEvent(event, id, newDate)).to.not.throw(Error);
      expect(() => addEvent()).to.throw(Error);
      expect(() => addEvent(newDate, id, event)).to.throw(Error);
      expect(() => addEvent(eventString, id, newDate)).to.throw(Error);
      expect(() => addEvent(eventUncorrect, id, newDate)).to.throw(Error);
      expect(() => addEvent(eventUncorrectTitle, id, newDate)).to.throw(Error);
      expect(() => addEvent(eventUncorrectDate, id, newDate)).to.throw(Error);
      expect(() => addEvent(eventUncorrectTime, id, newDate)).to.throw(Error);
    });

    it('should trow error if date is not correct', () => {
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const id = 'id';
      const dateNumber = 20160101;
      const dateObject = { date: '2016-01-01'};
      const dateUncorrect = '2016-50-35';
      const dateCorrect = '2016-01-01';

      expect(() => addEvent()).to.throw(Error);
      expect(() => addEvent(event, id, dateNumber)).to.throw(Error);
      expect(() => addEvent(event, id, dateUncorrect)).to.throw(Error);
      expect(() => addEvent(event, id, dateObject)).to.throw(Error);
      expect(() => addEvent(event, id)).to.not.throw(Error);
      expect(() => addEvent(event, id, dateCorrect)).to.not.throw(Error);
    });

    it('should trow error if userId is not correct', () => {
      const newDate = '2017-01-01';
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const id = 'id';
      const idObject = { id: 'id'};
      const idEmpty = '';
      const idNotTrimed = '  ';

      expect(() => addEvent()).to.throw(Error);
      expect(() => addEvent(event)).to.throw(Error);
      expect(() => addEvent(event, idObject, newDate)).to.throw(Error);
      expect(() => addEvent(event, idEmpty, newDate)).to.throw(Error);
      expect(() => addEvent(event, idNotTrimed, newDate)).to.throw(Error);
      expect(() => addEvent(event, id)).to.not.throw(Error);
      expect(() => addEvent(event, id, newDate, )).to.not.throw(Error);
    });
  });

  describe('save event action', () => {


    it('should trow error if event is not correct', () => {
      const id = 'id';
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const newEvent = { title: 'event2', text: 'text2', date: '2017-01-01', startTime: '00:00', endTime: '00:00' };
      const eventString = 'event';
      const eventUncorrect = { startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTitle = { title: '', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectDate = { title: 'title', text: 'text', date: '2016-01-35', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTime = { title: '', text: 'text', date: '2016-01-01', startTime: '00:60', endTime: '00:00' };

      expect(() => saveEvent()).to.throw(Error);
      expect(() => saveEvent(newEvent, id, event)).to.throw(Error);
      expect(() => saveEvent(eventString, newEvent, id)).to.throw(Error);
      expect(() => saveEvent(eventUncorrect, newEvent, id)).to.throw(Error);
      expect(() => saveEvent(eventUncorrectTitle, newEvent, id)).to.throw(Error);
      expect(() => saveEvent(eventUncorrectDate, newEvent, id)).to.throw(Error);
      expect(() => saveEvent(eventUncorrectTime, newEvent, id)).to.throw(Error);
      expect(() => saveEvent(event, newEvent, id)).to.not.throw(Error);
    });

    it('should trow error if newEvent is not correct', () => {
      const id = 'id';
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const newEvent = { title: 'event2', text: 'text2', date: '2017-01-01', startTime: '00:00', endTime: '00:00' };
      const newEventString = 'event';
      const newEventUncorrect = { startTime: '00:00', endTime: '00:00' };
      const newEventUncorrectTitle = { title: '', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const newEventUncorrectDate = { title: 'title', text: 'text', date: '2016-01-35', startTime: '00:00', endTime: '00:00' };
      const newEventUncorrectTime = { title: '', text: 'text', date: '2016-01-01', startTime: '00:60', endTime: '00:00' };

      expect(() => saveEvent()).to.throw(Error);
      expect(() => saveEvent(event, id, newEvent)).to.throw(Error);
      expect(() => saveEvent(event, newEventString, id)).to.throw(Error);
      expect(() => saveEvent(event, newEventUncorrect, id)).to.throw(Error);
      expect(() => saveEvent(event, newEventUncorrectTitle, id)).to.throw(Error);
      expect(() => saveEvent(event, newEventUncorrectDate, id)).to.throw(Error);
      expect(() => saveEvent(event, newEventUncorrectTime, id)).to.throw(Error);
      expect(() => saveEvent(event, newEvent, id)).to.not.throw(Error);
    });

    it('should trow error if userId is not correct', () => {
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const newEvent = { title: 'event2', text: 'text2', date: '2017-01-01', startTime: '00:00', endTime: '00:00' };
      const id = 'id';
      const idObject = { id: 'id'};
      const idEmpty = '';
      const idNotTrimed = '  ';

      expect(() => saveEvent()).to.throw(Error);
      expect(() => saveEvent(event)).to.throw(Error);
      expect(() => saveEvent(event, newEvent)).to.throw(Error);
      expect(() => saveEvent(event, newEvent, idObject)).to.throw(Error);
      expect(() => saveEvent(event, newEvent, idEmpty)).to.throw(Error);
      expect(() => saveEvent(event, newEvent, idNotTrimed)).to.throw(Error);
      expect(() => saveEvent(event, newEvent, id)).to.not.throw(Error);
    });
  });

  describe('event saved action', () => {
    it('should create an action to save edited event', () => {
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const newEvent = { title: 'event2', text: 'text2', date: '2017-01-01', startTime: '00:00', endTime: '00:00' };
      const expected = {
        type: SAVE_EVENT,
        event,
        newEvent
      };

      const actual = eventSaved(event, newEvent);

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('edit event action', () => {
    it('should create an action to edit event', () => {
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const expected = {
        type: EDIT_EVENT,
        event
      };

      const actual = editEvent(event);

      expect(actual).to.deep.equal(expected);
    });

    it('should trow error if event is not correct', () => {

      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventString = 'event';
      const eventUncorrect = { startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTitle = { title: '', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectDate = { title: 'title', text: 'text', date: '2016-01-35', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTime = { title: '', text: 'text', date: '2016-01-01', startTime: '00:60', endTime: '00:00' };

      expect(() => editEvent(eventString)).to.throw(Error);
      expect(() => editEvent(eventUncorrect)).to.throw(Error);
      expect(() => editEvent(eventUncorrectTitle)).to.throw(Error);
      expect(() => editEvent(eventUncorrectDate)).to.throw(Error);
      expect(() => editEvent(eventUncorrectTime)).to.throw(Error);
      expect(() => editEvent()).to.not.throw(Error);
      expect(() => editEvent(event)).to.not.throw(Error);
    });
  });

  describe('event deleted action', () => {

    it('should trow error if event is not correct', () => {
      const id = 'id';
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventString = 'event';
      const eventUncorrect = { startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTitle = { title: '', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectDate = { title: 'title', text: 'text', date: '2016-01-35', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTime = { title: '', text: 'text', date: '2016-01-01', startTime: '00:60', endTime: '00:00' };

      expect(() => deleteEvent()).to.throw(Error);
      expect(() => deleteEvent(event)).to.throw(Error);
      expect(() => deleteEvent(eventString, id)).to.throw(Error);
      expect(() => deleteEvent(eventUncorrect, id)).to.throw(Error);
      expect(() => deleteEvent(eventUncorrectTitle, id)).to.throw(Error);
      expect(() => deleteEvent(eventUncorrectDate, id)).to.throw(Error);
      expect(() => deleteEvent(eventUncorrectTime, id)).to.throw(Error);
      expect(() => deleteEvent(event, id)).to.not.throw(Error);
    });

    it('should trow error if userId is not correct', () => {
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const id = 'id';
      const idObject = { id: 'id'};
      const idEmpty = '';
      const idNotTrimed = '  ';

      expect(() => deleteEvent()).to.throw(Error);
      expect(() => deleteEvent(event)).to.throw(Error);
      expect(() => deleteEvent(event, idObject)).to.throw(Error);
      expect(() => deleteEvent(event, idEmpty)).to.throw(Error);
      expect(() => deleteEvent(event, idNotTrimed)).to.throw(Error);
      expect(() => deleteEvent(event, id)).to.not.throw(Error);
    });
  });

  describe('delete event action', () => {
    it('should create an action to delete target event', () => {
      const eventId = '2016-01-01';
      const expected = {
        type: DELETE_EVENT,
        eventId
      };

      const actual = eventDeleted(eventId);

      expect(actual).to.deep.equal(expected);
    });

    it('should trow error if eventId is not correct', () => {
      const id = 'id';
      const idObject = { id: 'id'};
      const idEmpty = '';
      const idNotTrimed = '  ';

      expect(() => eventDeleted()).to.throw(Error);
      expect(() => eventDeleted(idObject)).to.throw(Error);
      expect(() => eventDeleted(idEmpty)).to.throw(Error);
      expect(() => eventDeleted(idNotTrimed)).to.throw(Error);
      expect(() => eventDeleted(id)).to.not.throw(Error);
    });
  });
});
