import React, { Component } from 'react';
import { chunk } from 'lodash';

import MonthWeek from './month_week/month_week.js';

import { getTargetMonthDays } from '../../../../utils/date';

import { weekDays } from '../../../../constants/weekDays';

import './month_body.css';

export class MonthBody extends Component {

  renderWeek(week, index) {
    return (
      <MonthWeek 
        key={index} 
        days={week}
        userId={this.props.userId}
        targetDate={this.props.targetDate}
        events={this.props.events}
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

export default MonthBody;


