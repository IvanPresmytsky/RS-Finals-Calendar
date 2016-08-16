import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import  SceduleEvent from './ScheduleEvent.js';

import { editEvent, deleteEvent } from '../../actions/events.js';
import { openAddEventForm } from '../../actions/popups.js'

import { getActualEvents, sortEventsByTime } from '../../utils/date.js';

import '../../stylesheets/components/scheduleView/scheduleView.css';

export class Schedule extends Component {

  renderEventList (event, index) {
    return (
      <SceduleEvent 
        key={event.date+index} 
        event={event}
        openAddEventForm={this.props.openAddEventForm}
        deleteEvent={this.props.deleteEvent}
        editEvent={this.props.editEvent}
        userId={this.props.userId}
      />
    );
  }

  render () {
    let sortedEvents = sortEventsByTime(this.props.events);
    sortedEvents = getActualEvents(sortedEvents, this.props.targetDate);
    let eventList = sortedEvents.map(this.renderEventList.bind(this));

    return (
      <div className = "schedule">
        <ul className = "schedule__event-list">
          {eventList}
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
  editEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string
}

function mapStateToProps (state) {
  return {
    events: state.events.events,
    targetDate: state.pagination.targetDate,
    userId: state.authorization.id
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openAddEventForm: bindActionCreators(openAddEventForm, dispatch),
    editEvent: bindActionCreators(editEvent, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
