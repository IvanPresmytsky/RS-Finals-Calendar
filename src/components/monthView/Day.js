import classNames from 'classnames';
import React, { Component } from 'react';

import Event from './Event.js';

import { getCurrentFormatedDate, getOriginalId } from '../../utils/date.js';
import { countAddEventPosition, countDayEventsPopupPosition } from '../../utils/position.js';
import { EVENT_HEIGHT } from '../../constants/sizes.js';
import { NEXT_MONTH, PREVIOUS_MONTH} from '../../constants/pagination.js';

import '../../stylesheets/components/monthView/monthDay.css';

export class Day extends Component {
  onDayClick (e) {
    if (e.target.dataset.name === 'event' || e.target.parentNode.dataset.name === 'event') return;
    if (e.target.dataset.name === 'more') return;
    if (e.target.classList.contains('prev-month-day') || e.target.parentNode.classList.contains('prev-month-day')) {
      this.props.changeTargetDate(PREVIOUS_MONTH);
      return;
    }
    if (e.target.classList.contains('next-month-day') || e.target.parentNode.classList.contains('next-month-day')) {
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
    let position = countDayEventsPopupPosition(dayPosition, eventsHeight);

    this.props.openDayEventsPopup(id, position);
  }

  getDayNumber (day, currentDate) {
    let dayNumber = day.getDate();
    if(dayNumber <= 9) {
      return '0' + dayNumber;
    }
    return dayNumber;
  }

  renderEventsList (event, index) {
    let eventKey = getOriginalId();
    return (
      <Event 
        key={eventKey + index} 
        event={event} 
        userId={this.props.userId}
        openEventMenu={this.props.openEventMenu}
        addEvent={this.props.addEvent}
        saveEvent={this.props.saveEvent}  
      />
    );
  }

  renderHiddenEventsList (events) {
    let eventKey = getOriginalId();
    let eventsCount = `${events.length - 1} more...`;
    return (
      <div>
        <Event 
          key={eventKey} 
          event={events[0]} 
          userId={this.props.userId}
          openEventMenu={this.props.openEventMenu}
          addEvent={this.props.addEvent}
          saveEvent={this.props.saveEvent} 
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
    let eventsList;
    let day = this.props.day;
    let id = this.props.id;
    let currentDate = getCurrentFormatedDate();
    let currentMonth = this.props.targetDate.getMonth();
    let eventsHeight = this.countMaxEventsHeight();

    if (eventsHeight && eventsHeight < 0) {
      eventsList = this.renderHiddenEventsList(this.props.events);
    } else {
      eventsList = this.props.events.map(this.renderEventsList.bind(this));
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
          <span className='day-number__number'>
            {this.getDayNumber(day, currentDate)}
          </span>
        </span>
        {eventsList}
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
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  openDayEventsPopup: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string
}

export default Day;
