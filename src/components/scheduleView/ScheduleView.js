import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import  SceduleEvent from './ScheduleEvent.js';

import { changeEvent, deleteEvent, addEventOpen } from '../../actions/events.js';
import { openAddEventForm } from '../../actions/popups.js'

import date from '../../utils/date.js';

import '../../stylesheets/components/scheduleView/scheduleView.css';

export class Schedule extends Component {

  createEventlistTemplate (event, index) {
    return (
      <SceduleEvent 
        key={event.date+index} 
        event={event}
        openAddEventForm={this.props.openAddEventForm}
        deleteEvent={this.props.deleteEvent}
        changeEvent={this.props.changeEvent}
      />
    );
  }

  render () {

    let sortedEvents = date.sortedEvents(this.props.events);

    sortedEvents = date.actualEvents(sortedEvents, this.props.currentDayIndex);

    let eventlistTemplate = sortedEvents.map(this.createEventlistTemplate.bind(this));

    return (
      <div className = "schedule">
        <ul className = "schedule__event-list">
          {eventlistTemplate}
        </ul>
        <div className = "scedule__pagination">
          <a href="#" className = "pagination__next-btn"> next </a>
        </div>
      </div>
    );
  }
};

Schedule.propTypes = {
  events: React.PropTypes.array.isRequired,
  currentDayIndex: React.PropTypes.number.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  changeEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    events: state.events.events,
    currentDayIndex: state.pagination.dayIndex
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openAddEventForm: bindActionCreators(openAddEventForm, dispatch),
    changeEvent: bindActionCreators(changeEvent, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
