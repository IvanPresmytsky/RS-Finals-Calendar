import '../../stylesheets/components/monthViewComponents/monthDay.css';

import classNames from 'classnames';
import React, { Component } from 'react';

import Event from '../Event.js';

import date from '../../utils/date.js';
import { countAddEventPosition } from '../../utils/position.js';

export class Day extends Component {
  onDaytClick (e) {
    if (e.target.dataset.name === 'event' || e.target.parentNode.dataset.name === 'event') return;
    let monthIndex = this.props.currentMonthIndex;
    if (e.target.classList.contains('prev-month-day')) {
      this.props.changeMonth(--monthIndex);
      return;
    }
    if (e.target.classList.contains('next-month-day')) {
      this.props.changeMonth(++monthIndex);
      return;
    }

    e.preventDefault();
    let dayPosition = e.target.getBoundingClientRect();
    let addEventPosition = countAddEventPosition(dayPosition);
    let defaultDate = e.target.id || e.target.parentNode.id;
    console.log(defaultDate);
    this.props.addEventOpen(addEventPosition, defaultDate);
  }

  createEventsTemplate (event, index) {
    let eventKey = date.originalKey();
    return (
      <Event key={eventKey + index} event={event} />
    );
  }

  render () {
    let day = this.props.day;
    let id = this.props.id;
    let currentDate = this.props.currentDate;
    let currentMonth = this.props.currentMonth;
    let eventsTemplate = this.props.events.map(this.createEventsTemplate.bind(this));

    let dayClass = classNames('month-view__day', {
      ' holiday-day': day.getDay() === 0 || day.getDay() === 6,
      ' current-day': currentDate === id,
      ' prev-month-day': day.getMonth() < currentMonth,
      ' next-month-day': day.getMonth() > currentMonth
    });

    return (
      <div id={id} className={dayClass} onClick={this.onDaytClick.bind(this)}>
        <span className="day__day-number">
          {day.getDate()}
        </span>
        {eventsTemplate}
      </div>
    );
  }
};

Day.propTypes = {
  day: React.PropTypes.object.isRequired,
  id: React.PropTypes.string.isRequired,
  currentDate: React.PropTypes.string.isRequired,
  currentMonth: React.PropTypes.number.isRequired,
  currentMonthIndex: React.PropTypes.number.isRequired,
  events: React.PropTypes.array.isRequired,
  addEventOpen: React.PropTypes.func.isRequired,
  changeMonth: React.PropTypes.func.isRequired
}

export default Day;
