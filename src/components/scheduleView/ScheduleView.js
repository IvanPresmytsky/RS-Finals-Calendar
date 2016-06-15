import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import  SceduleEvent from './ScheduleEvent.js';

import { targetEventForChange, deleteEvent } from '../../actions/events.js';
import { openAddEventForm } from '../../actions/popups.js'

import { getActualEvents, sortEventsByTime } from '../../utils/date.js';

import '../../stylesheets/components/scheduleView/scheduleView.css';

export class Schedule extends Component {

  createEventlistTemplate (event, index) {
    return (
      <SceduleEvent 
        key={event.date+index} 
        event={event}
        openAddEventForm={this.props.openAddEventForm}
        deleteEvent={this.props.deleteEvent}
        targetEventForChange={this.props.targetEventForChange}
      />
    );
  }

  render () {

    //let sortedEvents = date.sortedEvents(this.props.events);
    let sortedEvents = sortEventsByTime(this.props.events);
    //sortedEvents = date.actualEvents(sortedEvents, this.props.currentDayIndex);
    sortedEvents = getActualEvents(sortedEvents, this.props.targetDate);
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
  targetDate: React.PropTypes.object.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  targetEventForChange: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    events: state.events.events,
    targetDate: state.pagination.targetDate
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openAddEventForm: bindActionCreators(openAddEventForm, dispatch),
    targetEventForChange: bindActionCreators(targetEventForChange, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
