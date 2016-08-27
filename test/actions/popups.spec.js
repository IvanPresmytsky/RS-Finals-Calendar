import { openAddEventForm,
         openEventMenu, 
         openDayEventsPopup,
         openNotificationPopup, 
         openMessagePopup } from '../../src/actions/popups.js';

import { ADD_EVENT_FORM_OPEN,
         EVENT_MENU_OPEN,
         DAY_EVENTS_POPUP_OPEN,
         NOTIFICATION_POPUP_OPEN,
         MESSAGE_POPUP_OPEN } from '../../src/actions/popups.js';

describe('Popups actions', () => {
  describe('open add Event Form action', () => {
    it('should create an action to open add event form', () => {
      const position = { top: 50, left: 50 };
      const defaultDate = '2016-01-01';

      const expected = {
        type: ADD_EVENT_FORM_OPEN,
        position,
        defaultDate
      };

      const actual = openAddEventForm(position, defaultDate);

      expect(actual).to.deep.equal(expected);
    });

    it('should trow error if date is not correct', () => {
      const position = { top: 50, left: 50 };
      const defaultDateNumber = 20160101;
      const defaultDateObject = { date: '2016-01-01'};
      const defaultDateUncorrect = '2016-50-35';
      const defaultDateCorrect = '2016-01-01';

      expect(() => openAddEventForm(position)).to.not.throw(Error);
      expect(() => openAddEventForm()).to.not.throw(Error);
      expect(() => openAddEventForm(position, defaultDateNumber)).to.throw(Error);
      expect(() => openAddEventForm(position, defaultDateUncorrect)).to.throw(Error);
      expect(() => openAddEventForm(position, defaultDateObject)).to.throw(Error);
      expect(() => openAddEventForm(position, defaultDateCorrect)).to.not.throw(Error);
    });

    it('should return default position if position is not correct', () => {
      const defaultDate= '2016-01-01';
      const defaultPosition = { top: 0, left: 0 };
      const positionUncorrect = { top: '25', left: -50 };
      const positionCorrect = { top: 50, left: 50};
      const positionString = 'position';
      const positionNumber = 5050;

      expect(() => openAddEventForm()).to.not.throw(Error);
      expect(openAddEventForm(defaultDate).position).to.deep.equal(defaultPosition);
      expect(openAddEventForm(positionUncorrect, defaultDate).position).to.deep.equal(defaultPosition);
      expect(openAddEventForm(positionString, defaultDate).position).to.deep.equal(defaultPosition);
      expect(openAddEventForm(positionNumber, defaultDate).position).to.deep.equal(defaultPosition);
      expect(openAddEventForm(positionCorrect, defaultDate).position).to.deep.equal(positionCorrect);
    });
  });

  describe('open event menu action', () => {
    it('should create an action to open event menu', () => {
      const position = { top: 50, left: 50 };
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };

      const expected = {
        type: EVENT_MENU_OPEN,
        event,
        position,
      };

      const actual = openEventMenu(event, position);

      expect(actual).to.deep.equal(expected);
    });

    it('should trow error if event is not correct', () => {
      const position = { top: 50, left: 50 };
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventString = 'event';
      const eventUncorrect = { startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTitle = { title: '', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectDate = { title: 'title', text: 'text', date: '2016-01-35', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTime = { title: '', text: 'text', date: '2016-01-01', startTime: '00:60', endTime: '00:00' };

      expect(() => openEventMenu(event)).to.not.throw(Error);
      expect(() => openEventMenu(event, position)).to.not.throw(Error);
      expect(() => openEventMenu()).to.throw(Error);
      expect(() => openEventMenu(position, event)).to.throw(Error);
      expect(() => openEventMenu(position, eventString)).to.throw(Error);
      expect(() => openEventMenu(position, eventUncorrect)).to.throw(Error);
      expect(() => openEventMenu(position, eventUncorrectTitle)).to.throw(Error);
      expect(() => openEventMenu(position, eventUncorrectDate)).to.throw(Error);
      expect(() => openEventMenu(position, eventUncorrectTime)).to.throw(Error);
    });

    it('should return default position if position is not correct', () => {
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const defaultPosition = { top: 0, left: 0 };
      const positionUncorrect = { top: '25', left: -50 };
      const positionCorrect = { top: 50, left: 50};
      const positionString = 'position';
      const positionNumber = 5050;

      expect(() => openEventMenu(event)).to.not.throw(Error);
      expect(openEventMenu(event, positionUncorrect).position).to.deep.equal(defaultPosition);
      expect(openEventMenu(event, positionString ).position).to.deep.equal(defaultPosition);
      expect(openEventMenu(event, positionNumber).position).to.deep.equal(defaultPosition);
      expect(openEventMenu(event, positionCorrect).position).to.deep.equal(positionCorrect);
    });
  });

  describe('open day events popup action', () => {
    it('should create an action to open day events popup', () => {
      const position = { top: 50, left: 50 };
      const dayId = '2016-01-01';

      const expected = {
        type: DAY_EVENTS_POPUP_OPEN,
        dayId,        
        position
      };

      const actual = openDayEventsPopup(dayId, position);

      expect(actual).to.deep.equal(expected);
    });

    it('should trow error if id is not correct', () => {
      const position = { top: 50, left: 50 };
      const idNumber = 20160101;
      const idObject = { date: '2016-01-01'};
      const idUncorrect = '2016-50-35';
      const idCorrect = '2016-01-01';

      expect(() => openDayEventsPopup(position)).to.throw(Error);
      expect(() => openDayEventsPopup()).to.throw(Error);
      expect(() => openDayEventsPopup(idNumber, position)).to.throw(Error);
      expect(() => openDayEventsPopup(idObject, position)).to.throw(Error);
      expect(() => openDayEventsPopup(idUncorrect, position)).to.throw(Error);
      expect(() => openDayEventsPopup(idCorrect, position)).to.not.throw(Error);
    });

    it('should return default position if position is not correct', () => {
      const id = '2016-01-01';
      const defaultPosition = { top: 0, left: 0 };
      const positionUncorrect = { top: '25', left: -50 };
      const positionCorrect = { top: 50, left: 50};
      const positionString = 'position';
      const positionNumber = 5050;

      expect(() => openDayEventsPopup(id)).to.not.throw(Error);
      expect(openDayEventsPopup(id, positionUncorrect).position).to.deep.equal(defaultPosition);
      expect(openDayEventsPopup(id, positionString ).position).to.deep.equal(defaultPosition);
      expect(openDayEventsPopup(id, positionNumber).position).to.deep.equal(defaultPosition);
      expect(openDayEventsPopup(id, positionCorrect).position).to.deep.equal(positionCorrect);
    });
  });

  describe('open notification popup action', () => {
    it('should create an action to open notification popup', () => {
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };

      const expected = {
        type: NOTIFICATION_POPUP_OPEN,
        event
      };

      const actual = openNotificationPopup(event);

      expect(actual).to.deep.equal(expected);
    });

    it('should trow error if event is not correct', () => {
      const event = { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventString = 'event';
      const eventUncorrect = { startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTitle = { title: '', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectDate = { title: 'title', text: 'text', date: '2016-01-35', startTime: '00:00', endTime: '00:00' };
      const eventUncorrectTime = { title: '', text: 'text', date: '2016-01-01', startTime: '00:60', endTime: '00:00' };

      expect(() => openNotificationPopup(event)).to.not.throw(Error);
      expect(() => openNotificationPopup()).to.throw(Error);
      expect(() => openNotificationPopup(eventString)).to.throw(Error);
      expect(() => openNotificationPopup(eventUncorrect)).to.throw(Error);
      expect(() => openNotificationPopup(eventUncorrectTitle)).to.throw(Error);
      expect(() => openNotificationPopup(eventUncorrectDate)).to.throw(Error);
      expect(() => openNotificationPopup(eventUncorrectTime)).to.throw(Error);
    });
  });

  describe('open message popup action', () => {
    it('should create an action to open message popup', () => {
      const message = 'Hello World';

      const expected = {
        type: MESSAGE_POPUP_OPEN,
        message
      };

      const actual = openMessagePopup(message);

      expect(actual).to.deep.equal(expected);
    });

    it('should trow error if message is not correct', () => {
      const message = 'message';
      const messageObject = { date: '2016-01-01'};
      const messageEmpty = '';
      const messageNotTrimed = '  ';


      expect(() => openMessagePopup()).to.throw(Error);
      expect(() => openMessagePopup(messageObject)).to.throw(Error);
      expect(() => openMessagePopup(messageEmpty)).to.throw(Error);
      expect(() => openMessagePopup(messageNotTrimed)).to.throw(Error);
      expect(() => openMessagePopup(message)).to.not.throw(Error);
    });
  });
});
