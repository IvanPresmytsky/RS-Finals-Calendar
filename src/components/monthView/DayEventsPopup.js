import classNames from 'classnames';
import React, { Component } from 'react';

import Event from './Event.js';

import date from '../../utils/date.js';

import { DAY_EVENTS_POPUP_WIDTH } from '../../constants/handlersConstants.js';

import '../../stylesheets/components/monthView/dayEventsPopup.css';

export class DayEventsPopup extends Component {
  onCloseClick (e) {
    e.preventDefault();
    this.props.closeDayEventsPopup();
  }

  createEventsTemplate (event, index) {
    let eventKey = date.originalKey();
    return (
      <Event 
        key={eventKey + index} 
        event={event} 
        openEventMenu={this.props.openEventMenu}
      />
    );
  }

  getDayEvents (id) {
    return this.props.events.filter((event) => event.date === id );
  }

  render () {
    let events = this.getDayEvents(this.props.dayId);
    let eventsTemplate = events.map(this.createEventsTemplate.bind(this));
    console.log(this.props.visibility);
    let eventsContainerClass = classNames('day-events-popup', {
      'day-events-popup--visible': this.props.visibility
    });
    let style = {
      top: this.props.position.top,
      left: this.props.position.left,
      width: DAY_EVENTS_POPUP_WIDTH + 'px'
    }

    console.log(style.width);
    console.log(style.top);
    console.log(style.left);
    console.log(this.props);
    return (
      <div className={eventsContainerClass} style={style}>
        <p className="day-events-popup__date">{this.props.dayId}</p>
        {eventsTemplate}
        <div className="day-events-popup__close">
          <a href="#" onClick={this.onCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
};

DayEventsPopup.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  position: React.PropTypes.object.isRequired,
  dayId: React.PropTypes.string,
  closeDayEventsPopup: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired
}

export default DayEventsPopup;
