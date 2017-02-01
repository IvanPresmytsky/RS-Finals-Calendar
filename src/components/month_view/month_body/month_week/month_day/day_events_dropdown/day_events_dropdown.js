import classNames from 'classnames';
import React, { Component } from 'react';

import Event from '../month_event/month_event.js';

import { getOriginalId } from '../../../../../../utils/date';

import { EVENT_HEIGHT, DAY_EVENTS_POPUP_WIDTH } from '../../../../../../constants/sizes.js';

import './day_events_dropdown.css';

export class DayEventsDropdown extends Component {
  constructor(props) {
    super(props);
    this.renderEventsList = this.renderEventsList.bind(this);
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

  getDayEvents (id) {
    return this.props.events.filter((event) => event.date === id );
  }

  countMaxEventsHeight (events) {
    let dayElem = document.getElementsByClassName('month-view__day')[0];
    let dayElemHeight = dayElem ? dayElem.offsetHeight : 1000;
    return dayElemHeight - (EVENT_HEIGHT * events.length) - 25;

  }

  render () {
    let events = this.props.events;

    let eventsHeight = this.countMaxEventsHeight(events);
    let eventsList = events.map(this.renderEventsList);
    let dayEventsDropdownClass = classNames('day-events-dropdown', {
      'day-events-dropdown--visible': this.props.visibility
    });

    let style = {
      width: 100 + '%'
    };

    if (events && eventsHeight >= 0 ) {
      style.display = 'none';
    }

    return (
      <div className={dayEventsDropdownClass} data-name="dayEventsDropdown" style={style}>
        <p className="day-events-popup__date">{this.props.dayId}</p>
        {eventsList}
      </div>
    );
  }
};

DayEventsDropdown.propTypes = {
  events: React.PropTypes.array.isRequired,
  visibility: React.PropTypes.bool.isRequired,
  dayId: React.PropTypes.string,
  openEventMenu: React.PropTypes.func.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string
}

export default DayEventsDropdown;
