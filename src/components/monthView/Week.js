import fecha from 'fecha';
import React, { Component } from 'react';

import { chunk } from 'lodash';
import Day from './Day.js';

import '../../stylesheets/components/monthView/monthWeek.css';

export class Week extends Component {

  getDayEvents (id) {
    return this.props.events.filter((event) => {
      let date = event.date.slice(0, 10);
      return date === id; 
    });
  }

  renderDay(day) {
    let id = fecha.format(day, 'YYYY-MM-DD');
    let dayEvents = this.getDayEvents(id);

    return (
      <Day 
        key={id} 
        id={id} 
        day={day} 
        events={dayEvents}
        targetDate={this.props.targetDate}
        userId={this.props.userId}
        openAddEventForm={this.props.openAddEventForm}
        addEvent={this.props.addEvent} 
        saveEvent={this.props.saveEvent}
        changeTargetDate={this.props.changeTargetDate}
        openDayEventsPopup={this.props.openDayEventsPopup}
        openEventMenu={this.props.openEventMenu}
      />
    );
  }

  render () {
    let weekDays = this.props.days.map(this.renderDay.bind(this));
    return (
      <div className="month-view__week">
        {weekDays}
      </div>
    );
  }
};

Week.propTypes = {
  days: React.PropTypes.array.isRequired,
  events: React.PropTypes.array.isRequired,
  targetDate: React.PropTypes.object.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  openDayEventsPopup: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired,
  changeTargetDate: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string
}

export default Week;
