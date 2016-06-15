import '../../stylesheets/components/monthView/monthBody.css';

import fecha from 'fecha';
import React, { Component } from 'react';
import { chunk } from 'lodash';

import Day from './Day.js';
import Week from './Week.js';

import { getTargetMonthDays } from '../../utils/date.js';
import { moveAt } from '../../utils/position.js';

import { DAYS } from '../../constants/data/DAYS.js'

export class MonthBody extends Component {

  getDayEvents (id) {
    return this.props.events.filter((event) => event.date === id );
  }

  createDayTemplate(day) {
    let id = fecha.format(day, 'YYYY-MM-DD');
    let dayEvents = this.getDayEvents(id);

    let dayNumsArr = getTargetMonthDays(this.props.targetDate);
    dayNumsArr = chunk(dayNumsArr, DAYS.length);
      
    return (
      <Day 
        key={id} 
        id={id} 
        day={day} 
        events={dayEvents}
        targetDate={this.props.targetDate}
        openAddEventForm={this.props.openAddEventForm}
        eventAdded={this.props.eventAdded} 
        changeTargetDate={this.props.changeTargetDate}
        openDayEventsPopup={this.props.openDayEventsPopup}
        openEventMenu={this.props.openEventMenu}
      />
    );
  }

  createWeekTemplate(week, index) {
    let daysTemplate = week.map(this.createDayTemplate.bind(this));
    return (
      <Week key={index} daysTemplate={daysTemplate} />
    );
  }

  render () {
    let dayNumsArr = getTargetMonthDays(this.props.targetDate);
    dayNumsArr = chunk(dayNumsArr, DAYS.length);

    let MonthBodyTemplate = dayNumsArr.map(this.createWeekTemplate.bind(this));

    return (
      <div className="month-body">
        {MonthBodyTemplate}
      </div>
    );
  }
};

MonthBody.propTypes = {
  targetDate: React.PropTypes.object.isRequired,
  events: React.PropTypes.array.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  eventAdded: React.PropTypes.func.isRequired,
  openDayEventsPopup: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired,
  changeTargetDate: React.PropTypes.func.isRequired
}

export default MonthBody;


