import { SIGN_IN } from '../../src/constants/authorization.js';
import { INITIALIZE_EVENTS } from '../../src/constants/actions.js';
import { initializeEvents, initializeUser, signIn, signUp, deleteUser, editUser } from '../../src/actions/authorization.js';
import { MESSAGE_POPUP_OPEN } from '../../src/actions/popups.js';
import PATH from '../../src/constants/path.js';
import thunk from 'redux-thunk';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Authorization actions', () => {
  
  describe('initialize events action', () => {
    it('should create an action to initialize events', () => {
      const events = [
        { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' },
        { title: 'event2', text: 'text2', date: '2017-01-01', startTime: '00:00', endTime: '00:00' }
      ];

      const expected = {
        type: INITIALIZE_EVENTS,
        events
      };

      const actual = initializeEvents(events);

      expect(actual).to.deep.equal(expected);
    });

    it('should throw an error if events are uncorrect', () => {
      const events = [
        { title: 'event', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' },
        { title: 'event2', text: 'text2', date: '2017-01-01', startTime: '00:00', endTime: '00:00' }
      ];
      const eventsUncorrect = [
        { title: '', text: 'text', date: '2016-01-01', startTime: '00:00', endTime: '00:00' },
        { title: 'event2', text: 'text2', date: '2017-01-32', startTime: '00:00', endTime: '00:00' }
      ];

      const eventsString = 'events'
      const eventsEmpty = [];

      expect(() => initializeEvents(events)).to.not.throw(Error);
      expect(() => initializeEvents(eventsEmpty)).to.not.throw(Error);
      expect(() => initializeEvents()).to.throw(Error);
      expect(() => initializeEvents(eventsUncorrect)).to.throw(Error);
      expect(() => initializeEvents(eventsString)).to.throw(Error);
    });
  });

  describe('initialize user action', () => {
    it('should create an action to initialize user', () => {
      const username = 'User';
      const id = '1';
      const expected = {
        type: SIGN_IN,
        username,
        id
      };

      const actual = initializeUser(username, id);

      expect(actual).to.deep.equal(expected);
    });

    it('should throw an error if username is uncorrect', () => {
      const username = 'User';
      const id = '1';
      const usernameObject = { username: 'user'};
      const usernameEmpty = '';
      const usernameNotTrimed = '  ';

      expect(() => initializeUser(username, id)).to.not.throw(Error);

      expect(() => initializeUser()).to.throw(Error);
      expect(() => initializeUser(username)).to.throw(Error);
      expect(() => initializeUser(usernameObject, id)).to.throw(Error);
      expect(() => initializeUser(usernameEmpty, id)).to.throw(Error);
      expect(() => initializeUser(usernameNotTrimed, id)).to.throw(Error);
    });

    it('should throw an error if id is uncorrect', () => {
      const username = 'User';
      const id = '1';
      const idObject = { id: 'id'};
      const idEmpty = '';
      const idTrimed = '  ';

      expect(() => initializeUser(username, id)).to.not.throw(Error);

      expect(() => initializeUser()).to.throw(Error);
      expect(() => initializeUser(id)).to.throw(Error);
      expect(() => initializeUser(username, idObject)).to.throw(Error);
      expect(() => initializeUser(username, idEmpty)).to.throw(Error);
      expect(() => initializeUser(username, idTrimed)).to.throw(Error);
    });
  });

  describe('sign in action', () => {
    const events = [
                     { title: 'event1', text: 'text1', date: '2016-01-01', startTime: '00:00', endTime: '00:00' },
                     { title: 'event2', text: 'text2', date: '2016-02-01', startTime: '00:01', endTime: '00:02' },
                     { title: 'event3', text: 'text3', date: '2016-01-13', startTime: '00:00', endTime: '00:00' }
                   ];
    afterEach(() => {
      nock.cleanAll()
    });

    it('should throw an error if username is uncorrect', () => {
      const username = 'User';
      const password = 'password';
      const usernameObject = { username: 'user'};
      const usernameEmpty = '';
      const usernameNotTrimed = '  ';

      expect(() => signIn(username, password)).to.not.throw(Error);

      expect(() => signIn()).to.throw(Error);
      expect(() => signIn(username)).to.throw(Error);
      expect(() => signIn(usernameObject, password)).to.throw(Error);
      expect(() => signIn(usernameEmpty, password)).to.throw(Error);
      expect(() => signIn(usernameNotTrimed, password)).to.throw(Error);
    });

    it('should throw an error if password is uncorrect', () => {
      const username = 'User';
      const password = 'password';
      const passwordObject = { password: 'password'};
      const passwordEmpty = '';
      const passwordTrimed = '  ';

      expect(() => signIn(username, password)).to.not.throw(Error);

      expect(() => signIn()).to.throw(Error);
      expect(() => signIn(id)).to.throw(Error);
      expect(() => signIn(username, passwordObject)).to.throw(Error);
      expect(() => signIn(username, passwordEmpty)).to.throw(Error);
      expect(() => signIn(username, passwordTrimed)).to.throw(Error);
    });

    it('should create INITIALIZE_USER and SIGN_IN when sign in has been done', () => {
      
      nock('http://localhost:3000/api')
        .post('/signin', {
          username: 'user',
          password: 'password'
        })
        .reply(200, { 
          user: { 
                  username: 'user', 
                  _id: 'id',
                  events 
                }
        });

      const expectedActions = [
        { type: SIGN_IN, username: 'user', id: 'id' },
        { type: INITIALIZE_EVENTS, events }
      ];

      const store = mockStore({ username: null, password: null });

      return store.dispatch(signIn('user', 'password'))
      .then(() => {
        console.log(store.getActions());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should create MESSAGE_POPUP_OPEN when sign in has been done with uncorrect username', () => {

      nock('http://localhost:3000/api')
        .post('/signin', {
          username: 'uncorrect user',
          password: 'password'
        })
        .reply(404);

      const expectedActions = [
        { type: MESSAGE_POPUP_OPEN, message: 'invalid user'}
      ];

      const store = mockStore({ username: null, password: null });

      return store.dispatch(signIn('uncorrect user', 'password'))
      .then(() => {
        console.log(store.getActions());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should create MESSAGE_POPUP_OPEN when sign in has been done with uncorrect password', () => {

      nock('http://localhost:3000/api')
        .post('/signin', {
          username: 'user',
          password: 'uncorrect password'
        })
        .reply(401);

      const expectedActions = [
        { type: MESSAGE_POPUP_OPEN, message: 'invalid password'}
      ];

      const store = mockStore({ username: null, password: null });

      return store.dispatch(signIn('user', 'uncorrect password'))
      .then(() => {
        console.log(store.getActions());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

  });

  describe('sign up action', () => {

    it('should throw an error if username is uncorrect', () => {
      const username = 'User';
      const password = 'password';
      const usernameObject = { username: 'user'};
      const usernameEmpty = '';
      const usernameNotTrimed = '  ';

      expect(() => signUp(username, password)).to.not.throw(Error);

      expect(() => signUp()).to.throw(Error);
      expect(() => signUp(username)).to.throw(Error);
      expect(() => signUp(usernameObject, password)).to.throw(Error);
      expect(() => signUp(usernameEmpty, password)).to.throw(Error);
      expect(() => signUp(usernameNotTrimed, password)).to.throw(Error);
    });

    it('should throw an error if password is uncorrect', () => {
      const username = 'User';
      const password = 'password';
      const passwordObject = { password: 'password'};
      const passwordEmpty = '';
      const passwordTrimed = '  ';

      expect(() => signUp(username, password)).to.not.throw(Error);

      expect(() => signUp()).to.throw(Error);
      expect(() => signUp(password)).to.throw(Error);
      expect(() => signUp(username, passwordObject)).to.throw(Error);
      expect(() => signUp(username, passwordEmpty)).to.throw(Error);
      expect(() => signUp(username, passwordTrimed)).to.throw(Error);
    });

    it('should create MESSAGE_POPUP_OPEN when sign up has been done with state 300', () => {
      
      nock('http://localhost:3000/api')
        .post('/signup', {
          username: 'user',
          password: 'password'
        })
        .reply(300, '300');

      const expectedActions = [
        { type: MESSAGE_POPUP_OPEN, message: 'This user is already exist!'}
      ];

      const store = mockStore({ username: null, password: null });

      return store.dispatch(signUp('user', 'password'))
      .then(() => {
        console.log(store.getActions());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

  });

  describe('delete user action', () => {

    it('should throw an error if password is uncorrect', () => {
      const id = 'id';
      const password = 'password';
      const passswordObject = { password: 'password'};
      const passswordEmpty = '';
      const passswordTrimed = '  ';

      expect(() => deleteUser(password, id)).to.not.throw(Error);

      expect(() => deleteUser()).to.throw(Error);
      expect(() => deleteUser(password)).to.throw(Error);
      expect(() => deleteUser(passwordObject, id)).to.throw(Error);
      expect(() => deleteUser(passwordEmpty, id)).to.throw(Error);
      expect(() => deleteUser(passwordNotTrimed, id)).to.throw(Error);
    });

    it('should throw an error if id is uncorrect', () => {
      const id = 'id';
      const password = 'password';
      const idObject = { id: 'id'};
      const idEmpty = '';
      const idTrimed = '  ';

      expect(() => deleteUser(password, id)).to.not.throw(Error);

      expect(() => deleteUser()).to.throw(Error);
      expect(() => deleteUser(id)).to.throw(Error);
      expect(() => deleteUser(password, idObject)).to.throw(Error);
      expect(() => deleteUser(password, idEmpty)).to.throw(Error);
      expect(() => deleteUser(password, idTrimed)).to.throw(Error);
    });

    it('should create INITIALIZE_EVENTS and SIGN_IN when delete user has been done', () => {
      const userId = 'user'
      nock('http://localhost:3000/api/users')
        .delete('/' + userId, {
          password: 'password'
        })
        .reply(200, {message: 'user removed successfully'});

      const expectedActions = [
        { type: SIGN_IN, username: null, id: null },
        { type: INITIALIZE_EVENTS, events: [] }
      ];

      const store = mockStore({ username: null, password: null });

      return store.dispatch(deleteUser('password', userId))
      .then(() => {
        console.log(store.getActions());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should create MESSAGE_POPUP_OPEN when delete user has been done with uncorrect password', () => {
      const userId = 'user'
      nock('http://localhost:3000/api/users')
        .delete('/' + userId, {
          password: 'uncorrect password'
        })
        .reply(401, {message: 'Invalid password!'});

      const expectedActions = [
        { type: MESSAGE_POPUP_OPEN, message: 'Invalid password!' },
      ];

      const store = mockStore({ username: null, password: null });

      return store.dispatch(deleteUser('uncorrect password', userId))
      .then(() => {
        console.log(store.getActions());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

  });

  describe('edit user action', () => {

    it('should throw an error if id is uncorrect', () => {
      const editUserData = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const id = 'id';

      const idObject = { id: 'id'};
      const idEmpty = '';
      const idTrimed = '  ';

      expect(() => editUser(editUserData, id)).to.not.throw(Error);

      expect(() => editUser()).to.throw(Error);
      expect(() => editUser(editUserData)).to.throw(Error);
      expect(() => editUser(editUserData, idObject)).to.throw(Error);
      expect(() => editUser(editUserData, idEmpty)).to.throw(Error);
      expect(() => editUser(editUserData, idTrimed)).to.throw(Error);
    });

    it('should throw an error if newUsername is uncorrect', () => {
      const editUserData = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const newUsernameObject = {
        newUsername: { newUsername: 'newUsername'},
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const newUsernameEmpty = {
        newUsername: '',
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const newUsernameNotTrimed = {
        newUsername: '  ',
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const id = 'id';

      expect(() => editUser(editUserData, id)).to.not.throw(Error);

      expect(() => editUser()).to.throw(Error);
      expect(() => editUser(id)).to.throw(Error);
      expect(() => editUser(newUsernameObject, id)).to.throw(Error);
      expect(() => editUser(newUsernameEmpty, id)).to.throw(Error);
      expect(() => editUser(newUsernameNotTrimed, id)).to.throw(Error);
    });

    it('should throw an error if password is uncorrect', () => {
      const editUserData = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const passwordObject = {
        newUsername: 'newUsername',
        password: { password: 'password'},
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const passwordEmpty = {
        newUsername: 'newUsername',
        password: '',
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const passwordNotTrimed = {
        newUsername: 'newUsername',
        password: '  ',
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const id = 'id';

      expect(() => editUser(editUserData, id)).to.not.throw(Error);

      expect(() => editUser()).to.throw(Error);
      expect(() => editUser(id)).to.throw(Error);
      expect(() => editUser(passwordObject, id)).to.throw(Error);
      expect(() => editUser(passwordEmpty, id)).to.throw(Error);
      expect(() => editUser(passwordNotTrimed, id)).to.throw(Error);
    });

    it('should throw an error if newPassword is uncorrect', () => {
      const editUserData = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const newPasswordObject = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: { newPassword: 'newPassword'},
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const newPasswordEmpty = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: '',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const newPasswordNotTrimed = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: ' ',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const id = 'id';

      expect(() => editUser(editUserData, id)).to.not.throw(Error);

      expect(() => editUser()).to.throw(Error);
      expect(() => editUser(id)).to.throw(Error);
      expect(() => editUser(newPasswordObject, id)).to.throw(Error);
      expect(() => editUser(newPasswordEmpty, id)).to.throw(Error);
      expect(() => editUser(newPasswordNotTrimed, id)).to.throw(Error);
    });

    it('should throw an error if confirmedNewPassword is uncorrect', () => {
      const editUserData = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: 'confirmedNewPassword'
      };
      const confirmedNewPasswordObject = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: {confirmedNewPassword: 'confirmedNewPassword'}
      };
      const confirmedNewPasswordEmpty = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: ''
      };
      const confirmedNewPasswordNotTrimed = {
        newUsername: 'newUsername',
        password: 'password',
        newPassword: 'newPassword',
        confirmedNewPassword: '  '
      };
      const id = 'id';

      expect(() => editUser(editUserData, id)).to.not.throw(Error);

      expect(() => editUser()).to.throw(Error);
      expect(() => editUser(id)).to.throw(Error);
      expect(() => editUser(confirmedNewPasswordObject, id)).to.throw(Error);
      expect(() => editUser(confirmedNewPasswordEmpty, id)).to.throw(Error);
      expect(() => editUser(confirmedNewPasswordNotTrimed, id)).to.throw(Error);
    });

  });
});
