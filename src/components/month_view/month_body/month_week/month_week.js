import fecha from 'fecha';
import React, { Component } from 'react';

import { chunk } from 'lodash';
import Day from './month_day/month_day';

import './month_week.css';

export class MonthWeek extends Component {

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
        userId={this.props.userId}
        targetDate={this.props.targetDate}
        events={dayEvents}
        eventMenuTargetEvent={this.props.eventMenuTargetEvent}
        openAddEventForm={this.props.openAddEventForm} 
        addEvent={this.props.addEvent} 
        saveEvent={this.props.saveEvent}
        deleteEvent={this.props.deleteEvent}
        editEvent={this.props.editEvent}
        openEventMenu={this.props.openEventMenu}
        changeTargetDate={this.props.changeTargetDate}
        closePopup={this.props.closePopup}
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

MonthWeek.propTypes = {
  days: React.PropTypes.array.isRequired,
  events: React.PropTypes.array.isRequired,
  userId: React.PropTypes.string,
  targetDate: React.PropTypes.object.isRequired,
  events: React.PropTypes.array.isRequired,
  eventMenuTargetEvent: React.PropTypes.object,
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  editEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired,
  closePopup: React.PropTypes.func.isRequired,
  changeTargetDate: React.PropTypes.func.isRequired
}

export default MonthWeek;
