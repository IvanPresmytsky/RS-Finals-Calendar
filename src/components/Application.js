import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AddEvent from './AddEvent.js';
import Header from './Header.js';
import LogIn from './LogIn.js';
import MonthView from './MonthView.js';
import NavAndTools from './NavAndTools.js';
import Register from './Register.js';
import ScheduleView from './ScheduleView.js';

import { eventAdded, changeEvent, deleteEvent, addEventOpen } from '../actions/events.js';
import { logInOpen } from '../actions/logIn.js';
import { registerOpen } from '../actions/register.js';
import { setMonth, setDay } from '../actions/pagination.js';
import { eventsContainerPopupOpen, eventsContainerPopupClose } from '../actions/eventsContainerPopup.js';

import configureStore from '../store/configureStore.js';

import {SET_FILTER_MONTH, SET_FILTER_SCHEDULE} from '../constants/actions.js';


export class App extends Component {

  defineCalendarView (filter) {
    switch (filter) {
      case SET_FILTER_MONTH:
        return <MonthView 
                 currentMonthIndex={this.props.monthIndex}
                 events={this.props.events}
                 eventsContainerPopupVisibility={this.props.eventsContainerPopupVisibility}
                 eventsContainerPopupPosition={this.props.eventsContainerPopupPosition}
                 dayId={this.props.dayId}
                 addEventOpen={this.props.addEventOpen}
                 eventAdded={this.props.eventAdded}
                 changeMonth={this.props.setMonth}
                 eventsContainerPopupOpen={this.props.eventsContainerPopupOpen}
                 eventsContainerPopupClose={this.props.eventsContainerPopupClose}
               />;
      case SET_FILTER_SCHEDULE:
        return <ScheduleView 
                 events={this.props.events}
                 deleteEvent={this.props.deleteEvent}
                 changeEvent={this.props.changeEvent}
                 currentDayIndex={this.props.dayIndex}
                 addEventOpen={this.props.addEventOpen}
               />;
      default:
        return <MonthView 
                 currentMonthIndex={this.props.monthIndex} 
                 events={this.props.events}
                 eventsContainerPopupVisibility={this.props.eventsContainerPopupVisibility}
                 eventsContainerPopupPosition={this.props.eventsContainerPopupPosition}
                 dayId={this.props.dayId}
                 addEventOpen={this.props.addEventOpen} 
                 eventAdded={this.props.eventAdded} 
                 changeMonth={this.props.setMonth}
                 eventsContainerPopupOpen={this.props.eventsContainerPopupOpen}
                 eventsContainerPopupClose={this.props.eventsContainerPopupClose} 
               />;
      }
  }

  render () {
    console.log(this.props);

    let calendarView = this.defineCalendarView(this.props.calendarFilter);

    return (
      <div className="container">
         <div className="wrapper">
           <Header 
             logInOpen={this.props.logInOpen}
             registerOpen={this.props.registerOpen}
           />
           <NavAndTools />
         </div>
         {calendarView}
         <LogIn />
         <Register />
         <AddEvent />
      </div>
    );
  }
};

App.propTypes = {
  monthIndex: React.PropTypes.number.isRequired,
  dayIndex: React.PropTypes.number.isRequired,
  events: React.PropTypes.array.isRequired,
  calendarFilter: React.PropTypes.string.isRequired,
  eventForChange: React.PropTypes.object,
  eventsContainerPopupVisibility: React.PropTypes.bool.isRequired,
  eventsContainerPopupPosition: React.PropTypes.object.isRequired,
  dayId: React.PropTypes.string,
  setMonth: React.PropTypes.func.isRequired,
  setDay: React.PropTypes.func.isRequired,
  logInOpen: React.PropTypes.func.isRequired,
  registerOpen: React.PropTypes.func.isRequired,
  addEventOpen: React.PropTypes.func.isRequired,
  eventAdded: React.PropTypes.func.isRequired,
  changeEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired,
  eventsContainerPopupOpen: React.PropTypes.func.isRequired,
  eventsContainerPopupClose: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    monthIndex: state.pagination.monthIndex,
    dayIndex: state.pagination.dayIndex,
    events: state.addEvent.events,
    calendarFilter: state.calendarFilter.filter,
    eventForChange: state.addEvent.eventForChange,
    eventsContainerPopupVisibility: state.eventsContainerPopup.visibility,
    eventsContainerPopupPosition: state.eventsContainerPopup.position,
    dayId: state.eventsContainerPopup.dayId,

  };
}

function mapDispatchToProps (dispatch) {
  return {
    setMonth: bindActionCreators(setMonth, dispatch),
    setDay: bindActionCreators(setDay, dispatch),
    logInOpen: bindActionCreators(logInOpen, dispatch),
    registerOpen: bindActionCreators(registerOpen, dispatch),
    addEventOpen: bindActionCreators(addEventOpen, dispatch),
    eventAdded: bindActionCreators(eventAdded, dispatch),
    changeEvent: bindActionCreators(changeEvent, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch),
    eventsContainerPopupOpen: bindActionCreators(eventsContainerPopupOpen, dispatch),
    eventsContainerPopupClose: bindActionCreators(eventsContainerPopupClose, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

