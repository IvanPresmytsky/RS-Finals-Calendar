import React, { Component } from 'react';

import '../stylesheets/components/scheduleView.css';

import  SceduleEvent from './ScheduleEvent.js';

import { changeEvent, deleteEvent, addEventOpen } from '../actions/events.js';

import date from '../utils/date.js';

export class Schedule extends Component {

  createEventlistTemplate (event, index) {
    return (
      <SceduleEvent 
        key={event.date+index} 
        event={event}
        addEventOpen={this.props.addEventOpen}
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
  addEventOpen: React.PropTypes.func.isRequired,
  changeEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired
}

export default Schedule;
