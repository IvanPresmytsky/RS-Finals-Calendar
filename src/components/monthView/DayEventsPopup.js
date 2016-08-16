import classNames from 'classnames';
import React, { Component } from 'react';

import Event from './Event.js';

import { getOriginalId } from '../../utils/date.js';

import { EVENT_HEIGHT, DAY_EVENTS_POPUP_WIDTH } from '../../constants/sizes.js';

import '../../stylesheets/components/monthView/dayEventsPopup.css';

export class DayEventsPopup extends Component {
  onCloseClick (e) {
    e.preventDefault();
    this.props.closeDayEventsPopup();
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
    let events = this.getDayEvents(this.props.dayId);
    let eventsHeight = this.countMaxEventsHeight(events);
    let eventsList = events.map(this.renderEventsList.bind(this));
    let dayEventsPopupClass = classNames('day-events-popup', {
      'day-events-popup--visible': this.props.visibility
    });

    let style = {
      top: this.props.position.top,
      left: this.props.position.left,
      width: DAY_EVENTS_POPUP_WIDTH + 'px'
    }

    if (events && eventsHeight >= 0 ) {
      style.display = 'none';
    }

    return (
      <div className={dayEventsPopupClass} data-name="dayEventsPopup" style={style}>
        <p className="day-events-popup__date">{this.props.dayId}</p>
        {eventsList}
        <div className="day-events-popup__close">
          <a href="#" onClick={this.onCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
};

DayEventsPopup.propTypes = {
  events: React.PropTypes.array.isRequired,
  visibility: React.PropTypes.bool.isRequired,
  position: React.PropTypes.object.isRequired,
  dayId: React.PropTypes.string,
  closeDayEventsPopup: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string
}

export default DayEventsPopup;
