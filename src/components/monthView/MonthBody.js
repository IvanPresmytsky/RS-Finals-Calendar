import React, { Component } from 'react';
import { chunk } from 'lodash';

import Week from './Week.js';

import { getTargetMonthDays } from '../../utils/date.js';

import { weekDays } from '../../constants/weekDays.js';

import '../../stylesheets/components/monthView/monthBody.css';

export class MonthBody extends Component {

  renderWeek(week, index) {
    return (
      <Week 
        key={index} 
        days={week}
        events={this.props.events}
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


