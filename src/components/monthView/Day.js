import '../../stylesheets/components/monthView/monthDay.css';

import classNames from 'classnames';
import React, { Component } from 'react';

import Event from './Event.js';

import { getCurrentFormatedDate, getOriginalId } from '../../utils/date.js';
import { countAddEventPosition, countEventsContainerPopupPosition } from '../../utils/position.js';
import { EVENT_HEIGHT } from '../../constants/handlersConstants.js';
import { NEXT_MONTH, PREVIOUS_MONTH} from '../../constants/pagination.js';

export class Day extends Component {
  onDayClick (e) {
    if (e.target.dataset.name === 'event' || e.target.parentNode.dataset.name === 'event') return;
    if (e.target.dataset.name === 'more') return;
    if (e.target.classList.contains('prev-month-day')) {
      this.props.changeTargetDate(PREVIOUS_MONTH);
      return;
    }
    if (e.target.classList.contains('next-month-day')) {
      this.props.changeTargetDate(NEXT_MONTH);
      return;
    }

    e.preventDefault();
    let dayPosition = e.target.getBoundingClientRect();
    let addEventPosition = countAddEventPosition(dayPosition);
    let defaultDate = e.target.id || e.target.parentNode.id;
    this.props.openAddEventForm(addEventPosition, defaultDate);
  }

  onLinkMoreClick (e) {
    e.preventDefault();
    let day = e.target.parentNode.parentNode;
    let id = day.id;
    let dayPosition = day.getBoundingClientRect();
    let eventsHeight = this.props.events.length * EVENT_HEIGHT + 70;
    let position = countEventsContainerPopupPosition(dayPosition, eventsHeight);
    
    this.props.openDayEventsPopup(id, position);
  }

  createEventsTemplate (event, index) {
    let eventKey = getOriginalId();
    return (
      <Event 
        key={eventKey + index} 
        event={event} 
        openEventMenu={this.props.openEventMenu}
        eventAdded={this.props.eventAdded} 
      />
    );
  }

  createLargeEventsTemplate (events) {
    let eventKey = date.originalKey();
    let eventsCount = `${events.length - 1} more...`;
    return (
      <div>
        <Event 
          key={eventKey} 
          event={events[0]} 
          openEventMenu={this.props.openEventMenu}
          eventAdded={this.props.eventAdded} 
        />
        <a href="#" data-name="more" onClick={this.onLinkMoreClick.bind(this)}>
          {eventsCount}
        </a>
      </div>
    );
  }

  countMaxEventsHeight () {
    let dayElem = document.getElementsByClassName('month-view__day')[0];
    let dayElemHeight = dayElem ? dayElem.offsetHeight : 1000;
    return dayElemHeight - (EVENT_HEIGHT * this.props.events.length) - 25;
  }

  render () {
    let day = this.props.day;
    let id = this.props.id;
    let currentDate = getCurrentFormatedDate();
    let currentMonth = this.props.targetDate.getMonth();
    let eventsTemplate = this.props.events.map(this.createEventsTemplate.bind(this));;
    let eventsHeight = this.countMaxEventsHeight();

    if (eventsHeight && eventsHeight < 0) {
      eventsTemplate = this.createLargeEventsTemplate(this.props.events);
    } 

    let dayClass = classNames('month-view__day', {
      ' holiday-day': day.getDay() === 0 || day.getDay() === 6,
      ' current-day': currentDate === id,
      ' prev-month-day': day.getMonth() < currentMonth,
      ' next-month-day': day.getMonth() > currentMonth
    });

    return (
      <div id={id} className={dayClass} data-name="monthDay" onClick={this.onDayClick.bind(this)}>
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
  targetDate: React.PropTypes.object.isRequired,
  events: React.PropTypes.array.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  eventAdded: React.PropTypes.func.isRequired,
  openDayEventsPopup: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired
}

export default Day;
