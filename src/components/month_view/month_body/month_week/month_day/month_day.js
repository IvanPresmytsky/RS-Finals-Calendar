import classNames from 'classnames';
import React, { Component } from 'react';

import enhanceWithClickOutside from '../../../../../lib/components/enhance_with_click_outside';

import MonthEvent from './month_event/month_event.js';

import { getCurrentFormatedDate, getOriginalId } from '../../../../../utils/date';
import { countAddEventPosition } from '../../../../../utils/position';
import { EVENT_HEIGHT } from '../../../../../constants/sizes';
import { NEXT_MONTH, PREVIOUS_MONTH} from '../../../../../constants/pagination.js';
import DayEventsDropdown from './day_events_dropdown/day_events_dropdown';

import './month_day.css';

export class MonthDay extends Component {
  constructor(props) {
    super(props);
    this.state = { eventsListExpanded: false };
    this.onDayClick = this.onDayClick.bind(this);
    this.onLinkMoreClick = this.onLinkMoreClick.bind(this);
    this.renderEventsList = this.renderEventsList.bind(this);
  }

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

    this.props.openAddEventForm({ defaultDate });

    this.setState({ eventsListExpanded: false });
  }

  onLinkMoreClick (e) {
    e.preventDefault();
    this.setState({ eventsListExpanded: true });
  }

  handleClickOutside(e) {
    e.preventDefault();
    this.setState({ eventsListExpanded: false });
  }

  getDayNumber (day, currentDate) {
    let dayNumber = day.getDate();
    if(dayNumber <= 9) {
      return '0' + dayNumber;
    }
    return dayNumber;
  }

  countMaxEventsHeight () {
    let dayElem = document.getElementsByClassName('month-view__day')[0];
    let dayElemHeight = dayElem ? dayElem.offsetHeight : 1000;
    return dayElemHeight - (EVENT_HEIGHT * this.props.events.length) - 25;
  }

  renderEventsList (event, index) {
    let eventId = getOriginalId();
    return (
      <MonthEvent 
        key={eventId + index} 
        event={event} 
        userId={this.props.userId}
        openEventMenu={this.props.openEventMenu}
        addEvent={this.props.addEvent}
        saveEvent={this.props.saveEvent}
      />
    );
  }

  renderHiddenEventsList (events) {
    let eventIndex = getOriginalId();
    let event = this.renderEventsList(events[0], eventIndex);
    let eventsCount = `${events.length - 1} more...`;
    return (
      <div className="day__hidden-list">
        {event}
        <a href="#" data-name="more" onClick={this.onLinkMoreClick}>
          {eventsCount}
        </a>
        <DayEventsDropdown
          events={this.props.events}
          dayId={this.props.id}
          visibility={this.state.eventsListExpanded}
          userId={this.props.userId}
          openEventMenu={this.props.openEventMenu}
          addEvent={this.props.addEvent}
          saveEvent={this.props.saveEvent}
        />
      </div>
    );
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
      eventsList = this.props.events.map(this.renderEventsList);
    }

    let dayClass = classNames('month-view__day', {
      ' holiday-day': day.getDay() === 0 || day.getDay() === 6,
      ' current-day': currentDate === id,
      ' prev-month-day': day.getMonth() < currentMonth,
      ' next-month-day': day.getMonth() > currentMonth
    });

    return (
      <div id={id} className={dayClass} data-name="monthDay" onClick={this.onDayClick}>
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

MonthDay.propTypes = {
  day: React.PropTypes.object.isRequired,
  id: React.PropTypes.string.isRequired,
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
  changeTargetDate: React.PropTypes.func.isRequired,
}

export default enhanceWithClickOutside(MonthDay);
