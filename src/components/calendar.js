import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fecha from 'fecha';

import Header from './header/header';
import Popup from './popups/popup';

import { sortEventsByTime, getActualEvents } from '../utils/date';
import { openNotificationPopup } from './popups/notification_popup/notification_popup_actions.js';
import { loadEvents, initializeUser } from '../actions/authorization';

import * as popypTypes from './popups/popups_actions';

export class Calendar extends Component {
  constructor(props) {
    super(props);
    this.getTheNearestEvent = this.getTheNearestEvent.bind(this);
    this.timer;
  }

  componentDidMount () {
    this.timer = setInterval(this.getTheNearestEvent, 60000);
    if (sessionStorage.token) {
      console.log(typeof sessionStorage.token);
      console.log(sessionStorage.user);
      console.log(sessionStorage.userId);
      this.props.loadEvents(sessionStorage.userId);
      this.props.initializeUser(sessionStorage.user, sessionStorage.userId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
    return (
      <div className="container">
         <Header />
         {this.props.children}
         <Popup />
         <audio id="notificationSound" src="content/sounds/notification_sound.wav"></audio>
      </div>
    );
  }
};

Calendar.propTypes = {
  events: React.PropTypes.array.isRequired,
  userId: React.PropTypes.string,
  openNotificationPopup: React.PropTypes.func.isRequired,
  loadEvents: React.PropTypes.func.isRequired,
  initializeUser: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
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

