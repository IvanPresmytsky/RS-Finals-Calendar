import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fecha from 'fecha';

import AddEventForm from './AddEventForm.js';
import EditUserForm from './EditUserForm.js';
import DeleteUserPopup from './DeleteUserPopup.js';
import Header from './Header.js';
import LoginForm from './LoginForm.js';
import MonthView from './monthView/MonthView.js';
import NavAndTools from './NavAndTools.js';
import RegisterForm from './RegisterForm.js';
import NotificationPopup from './NotificationPopup.js';
import MessagePopup from './MessagePopup.js';
import ScheduleView from './scheduleView/ScheduleView.js';

import configureStore from '../store/configureStore.js';

import { sortEventsByTime, getActualEvents } from '../utils/date.js';
import { openNotificationPopup } from '../actions/popups.js';
import { loadEvents, initializeUser } from '../actions/authorization.js';

import {SET_VIEW_MONTH, SET_VIEW_SCHEDULE} from '../constants/actions.js';

export class App extends Component {

  componentDidMount () {
    let timer = setInterval(this.getTheNearestEvent.bind(this), 60000);
    if (sessionStorage.token) {
      this.props.loadEvents(sessionStorage.userId);
      this.props.initializeUser(sessionStorage.user, sessionStorage.userId);
    }
  }

  getCurrentView (view) {
    switch (view) {
      case SET_VIEW_MONTH:
        return <MonthView />;
      case SET_VIEW_SCHEDULE:
        return <ScheduleView />;
      default:
        throw new Error("invalid view!");
      }
  }

  getTheNearestEvent () {
    let events = this.props.events;
    
    if (events.length === 0) return;

    events = getActualEvents(events, new Date());

    if (events.length === 0) return;

    let event = sortEventsByTime(events)[0];

    let notificationTime = event.date + event.startTime;
    let currentDate = fecha.format(new Date(), 'YYYY-MM-DDHH:mm');
  
    if (notificationTime === currentDate) this.props.openNotificationPopup(event);

  }

  render () {
    let calendarView = this.getCurrentView(this.props.view);
    return (
      <div className="container">
         <div className="wrapper">
           <Header />
           <NavAndTools />
         </div>
         {calendarView}
         <LoginForm />
         <EditUserForm />
         <DeleteUserPopup />
         <RegisterForm />
         <AddEventForm />
         <NotificationPopup />
         <MessagePopup />
      </div>
    );
  }
};

App.propTypes = {
  view: React.PropTypes.string.isRequired,
  events: React.PropTypes.array.isRequired,
  userId: React.PropTypes.string,
  openNotificationPopup: React.PropTypes.func.isRequired,
  loadEvents: React.PropTypes.func.isRequired,
  initializeUser: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    view: state.views.view,
    events: state.events.events,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openNotificationPopup: bindActionCreators(openNotificationPopup, dispatch),
    loadEvents: bindActionCreators(loadEvents, dispatch),
    initializeUser: bindActionCreators(initializeUser, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

