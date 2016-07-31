import fecha from 'fecha';
import React, { Component } from 'react';
import { chunk } from 'lodash';

import Day from './Day.js';
import Week from './Week.js';

import { getTargetMonthDays } from '../../utils/date.js';
import { moveAt } from '../../utils/position.js';

import { weekDays } from '../../constants/weekDays.js';

import '../../stylesheets/components/monthView/monthBody.css';

export class MonthBody extends Component {

  getDayEvents (id) {
    return this.props.events.filter((event) => {
      let date = event.date.slice(0, 10);
      return date === id; 
    });
  }

  renderDay(day) {
    let id = fecha.format(day, 'YYYY-MM-DD');

    let dayEvents = this.getDayEvents(id);
    console.log();
    let dayNumsArr = getTargetMonthDays(this.props.targetDate);
    dayNumsArr = chunk(dayNumsArr, weekDays.length);
      
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

  renderWeek(week, index) {
    let days = week.map(this.renderDay.bind(this));
    return (
      <Week key={index} days={days} />
    );
  }

  render () {
    let dayNumsArr = getTargetMonthDays(this.props.targetDate);
    dayNumsArr = chunk(dayNumsArr, weekDays.length);

    let MonthBody = dayNumsArr.map(this.renderWeek.bind(this));

    return (
      <div className="month-body">
        {MonthBody}
      </div>
    );
  }
};

MonthBody.propTypes = {
  targetDate: React.PropTypes.object.isRequired,
  events: React.PropTypes.array.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  openDayEventsPopup: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired,
  changeTargetDate: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string
}

export default MonthBody;


