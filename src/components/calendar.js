import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fecha from 'fecha';

import Header from './header/header/header.js';
import MonthView from './month_view/month_view';
import NavAndTools from './header/nav_and_tools/nav_and_tools';
import Popup from './popups/popup';
import ScheduleView from './schedule_view/schedule_view';

import { sortEventsByTime, getActualEvents } from '../utils/date';
import { openNotificationPopup } from './popups/notification_popup/notification_popup_actions.js';
import { loadEvents, initializeUser } from '../actions/authorization';

import {SET_VIEW_MONTH, SET_VIEW_SCHEDULE} from '../constants/actions';
import * as popypTypes from './popups/popups_actions';

export class Calendar extends Component {
  constructor(props) {
    super(props);
    this.getTheNearestEvent = this.getTheNearestEvent.bind(this);
  }

  componentDidMount () {
    let timer = setInterval(this.getTheNearestEvent, 60000);
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
  
    if (notificationTime === currentDate) {
      this.props.openNotificationPopup({ actualEvent: event });
      let notificationSound = document.getElementById('notificationSound');
      notificationSound.play();
    }

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
         <Popup />
         <audio id="notificationSound" src="content/sounds/notification_sound.wav"></audio>
      </div>
    );
  }
};

Calendar.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

