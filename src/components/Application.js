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

import {SET_VIEW_MONTH, SET_VIEW_SCHEDULE} from '../constants/actions.js';

export class App extends Component {

  componentDidMount () {
    let timer = setInterval(this.getTheNearestEvent.bind(this), 60000);
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
    console.log(this.props);
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
  openNotificationPopup: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    view: state.views.view,
    events: state.events.events,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openNotificationPopup: bindActionCreators(openNotificationPopup, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

