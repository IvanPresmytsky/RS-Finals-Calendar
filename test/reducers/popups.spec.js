import deepFreeze from 'deep-freeze';
import { LOGIN_FORM_OPEN,
         LOGIN_FORM_CLOSE,
         USER_MENU_OPEN,
         USER_MENU_CLOSE,
         EDIT_USER_FORM_OPEN,
         EDIT_USER_FORM_CLOSE,
         DELETE_USER_POPUP_OPEN,
         DELETE_USER_POPUP_CLOSE,
         REGISTER_FORM_OPEN,
         REGISTER_FORM_CLOSE,
         ADD_EVENT_FORM_OPEN,
         ADD_EVENT_FORM_CLOSE,
         EVENT_MENU_OPEN,
         EVENT_MENU_CLOSE,
         DAY_EVENTS_POPUP_OPEN,
         DAY_EVENTS_POPUP_CLOSE,
         NOTIFICATION_POPUP_OPEN,
         NOTIFICATION_POPUP_CLOSE,
         MESSAGE_POPUP_OPEN,
         MESSAGE_POPUP_CLOSE } from '../../src/actions/popups';

describe('Popups reducer', () => {
  const reducer = require('../../src/reducers/popups.js');
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

  describe('Login form actions', () => {
    it('visibility should be true', () => {
      const action = { type: LOGIN_FORM_OPEN };
      const actual = reducer.default(undefined, action); 
      expect(actual.loginFormVisibility).to.deep.equal(true);
    });

    it('visibility should be false', () => {
      const action = { type: LOGIN_FORM_CLOSE };
      const actual = reducer.default(undefined, action); 
      expect(actual.loginFormVisibility).to.deep.equal(false);
    });
  });

  describe('User menu actions', () => {
    it('visibility should be true', () => {
      const action = { type: USER_MENU_OPEN };
      const actual = reducer.default(undefined, action); 
      expect(actual.userMenuVisibility).to.deep.equal(true);
    });

    it('visibility should be false', () => {
      const action = { type: USER_MENU_CLOSE };
      const actual = reducer.default(undefined, action); 
      expect(actual.userMenuVisibility).to.deep.equal(false);
    });
  });

  describe('Edit user form actions', () => {
    it('visibility should be true', () => {
      const action = { type: EDIT_USER_FORM_OPEN };
      const actual = reducer.default(undefined, action); 
      expect(actual.editUserFormVisibility).to.deep.equal(true);
    });

    it('visibility should be false', () => {
      const action = { type: EDIT_USER_FORM_CLOSE };
      const actual = reducer.default(undefined, action); 
      expect(actual.editUserFormVisibility).to.deep.equal(false);
    });
  });

  describe('Delete user popup actions', () => {
    it('visibility should be true', () => {
      const action = { type: DELETE_USER_POPUP_OPEN };
      const actual = reducer.default(undefined, action); 
      expect(actual.deleteUserPopupVisibility).to.deep.equal(true);
    });

    it('visibility should be false', () => {
      const action = { type: DELETE_USER_POPUP_CLOSE };
      const actual = reducer.default(undefined, action); 
      expect(actual.deleteUserPopupVisibility).to.deep.equal(false);
    });
  });

  describe('Register form actions', () => {
    it('visibility should be true', () => {
      const action = { type: REGISTER_FORM_OPEN };
      const actual = reducer.default(undefined, action); 
      expect(actual.registerFormVisibility).to.deep.equal(true);
    });

    it('visibility should be false', () => {
      const action = { type: REGISTER_FORM_CLOSE };
      const actual = reducer.default(undefined, action); 
      expect(actual.registerFormVisibility).to.deep.equal(false);
    });
  });

  describe('Add event form actions', () => {
    it('should return correct API', () => {
      const action = { 
        type: ADD_EVENT_FORM_OPEN,
        position: {top: 50, left: 50},
        defaultDate: '01.01.2016'
      };
      const actual = reducer.default(undefined, action);
      const actualAPI = {
        addEventFormVisibility: actual.addEventFormVisibility,
        addEventFormPosition: actual.addEventFormPosition,
        addEventFormDefaultDate: actual.addEventFormDefaultDate
      };
      const expected = {
        addEventFormVisibility: true,
        addEventFormPosition: {top: 50, left: 50},
        addEventFormDefaultDate: '01.01.2016',
      }
      
      expect(actualAPI).to.deep.equal(expected);
    });

    it('visibility should be false', () => {
      const action = { type: ADD_EVENT_FORM_CLOSE };
      const actual = reducer.default(undefined, action); 
      expect(actual.addEventFormVisibility).to.deep.equal(false);
    });
  });

  describe('Event menu actions', () => {
    it('should return correct API', () => {
      const action = { 
        type: EVENT_MENU_OPEN,
        event: { title: 'event', text: 'text', date: '01.01.2016', startTime: '00:00', endTime: '00:00' },
        position: {top: 50, left: 50}
      };
      const actual = reducer.default(undefined, action);
      const actualAPI = {
        eventMenuVisibility: actual.eventMenuVisibility,
        eventMenuPosition: actual.eventMenuPosition,
        eventMenuTargetEvent: actual.eventMenuTargetEvent
      };
      const expected = {
        eventMenuVisibility: true,
        eventMenuPosition: {top: 50, left: 50},
        eventMenuTargetEvent: { title: 'event', text: 'text', date: '01.01.2016', startTime: '00:00', endTime: '00:00' }
      }
      
      expect(actualAPI).to.deep.equal(expected);
    });

    it('visibility should be false', () => {
      const action = { type: EVENT_MENU_CLOSE };
      const actual = reducer.default(undefined, action); 
      expect(actual.eventMenuVisibility).to.deep.equal(false);
    });
  });

  describe('Day events popup actions', () => {
    it('should return correct API', () => {
      const action = { 
        type: DAY_EVENTS_POPUP_OPEN,
        dayId: 1,
        position: {top: 50, left: 50}
      };
      const actual = reducer.default(undefined, action);
      const actualAPI = {
        dayEventsPopupVisibility: actual.dayEventsPopupVisibility,
        dayEventsPopupPosition: actual.dayEventsPopupPosition,
        dayEventsPopupTargetDayId: actual.dayEventsPopupTargetDayId
      };
      const expected = {
        dayEventsPopupVisibility: true,
        dayEventsPopupPosition: {top: 50, left: 50},
        dayEventsPopupTargetDayId: 1
      }
      
      expect(actualAPI).to.deep.equal(expected);
    });

    it('visibility should be false', () => {
      const action = { type: DAY_EVENTS_POPUP_CLOSE };
      const actual = reducer.default(undefined, action); 
      expect(actual.dayEventsPopupVisibility).to.deep.equal(false);
    });
  });

  describe('Notification popup actions', () => {
    it('should return correct API', () => {
      const action = { 
        type: NOTIFICATION_POPUP_OPEN,
        event: { title: 'event', text: 'text', date: '01.01.2016', startTime: '00:00', endTime: '00:00' }
      };
      const actual = reducer.default(undefined, action);
      const actualAPI = {
        notificationPopupVisibility: actual.notificationPopupVisibility,
        notificationPopupEvent: actual.notificationPopupEvent
      };
      const expected = {
        notificationPopupVisibility: true,
        notificationPopupEvent: { title: 'event', text: 'text', date: '01.01.2016', startTime: '00:00', endTime: '00:00' }
      }
      
      expect(actualAPI).to.deep.equal(expected);
    });

    it('visibility should be false', () => {
      const action = { type: NOTIFICATION_POPUP_CLOSE };
      const actual = reducer.default(undefined, action); 
      expect(actual.notificationPopupVisibility).to.deep.equal(false);
    });
  });

  describe('Message popup actions', () => {
    it('should return correct API', () => {
      const action = { 
        type: MESSAGE_POPUP_OPEN,
        message: 'text'
      };
      const actual = reducer.default(undefined, action);
      const actualAPI = {
        messagePopupVisibility: actual.messagePopupVisibility,
        messagePopupMessage: actual.messagePopupMessage
      };
      const expected = {
        messagePopupVisibility: true,
        messagePopupMessage: 'text'
      }
      
      expect(actualAPI).to.deep.equal(expected);
    });

    it('visibility should be false', () => {
      const action = { type: MESSAGE_POPUP_CLOSE };
      const actual = reducer.default(undefined, action); 
      expect(actual.messagePopupVisibility).to.deep.equal(false);
    });
  });

});
