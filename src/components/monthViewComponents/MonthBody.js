import '../../stylesheets/components/monthViewComponents/monthBody.css';

import fecha from 'fecha';
import React, { Component } from 'react';

import Day from './Day.js';
import Week from './Week.js';

import date from '../../utils/date.js';
import { moveAt } from '../../utils/position.js';


export class MonthBody extends Component {

  defineDayEvents (id) {
    return this.props.events.filter((event) => event.date === id );
  }

  createDayTemplate(day) {
    let id = fecha.format(day, 'YYYY-MM-DD');
    let currentDate = date.curentDateFormated();
    let dayEvents = this.defineDayEvents(id);
    let dayNumsArr = date.dayNums(this.props.currentMonthIndex);
    let currentMonth = dayNumsArr[Math.round(dayNumsArr.length/2)].getMonth();
    dayNumsArr = date.splitDaysToWeeks(dayNumsArr);
      
    return (
      <Day 
        key={id} 
        id={id} 
        day={day} 
        currentDate={currentDate}
        currentMonth={currentMonth} 
        events={dayEvents}
        currentMonthIndex={this.props.currentMonthIndex}
        addEventOpen={this.props.addEventOpen}
        eventAdded={this.props.eventAdded} 
        changeMonth={this.props.changeMonth}
        eventsContainerPopupOpen={this.props.eventsContainerPopupOpen}
        eventOptionsPopupOpen={this.props.eventOptionsPopupOpen}
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
    let dayNumsArr = date.dayNums(this.props.currentMonthIndex);
    dayNumsArr = date.splitDaysToWeeks(dayNumsArr);

    let MonthBodyTemplate = dayNumsArr.map(this.createWeekTemplate.bind(this));

        
    return (
      <div className="month-body">
        {MonthBodyTemplate}
      </div>
    );
  }
};

MonthBody.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired,
  events: React.PropTypes.array.isRequired,
  addEventOpen: React.PropTypes.func.isRequired,
  eventAdded: React.PropTypes.func.isRequired,
  changeMonth: React.PropTypes.func.isRequired,
  eventsContainerPopupOpen: React.PropTypes.func.isRequired,
  eventOptionsPopupOpen: React.PropTypes.func.isRequired
}

export default MonthBody;


