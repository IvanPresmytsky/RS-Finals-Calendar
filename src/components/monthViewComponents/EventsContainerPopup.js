import classNames from 'classnames';
import React, { Component } from 'react';

import Event from '../Event.js';

import date from '../../utils/date.js';

import { EVENT_CONTAINER_POPUP_WIDTH } from '../../constants/handlersConstants.js';

import '../../stylesheets/components/monthViewComponents/eventsContainerPopup.css';

export class EventsContainerPopup extends Component {
  onCloseClick (e) {
    e.preventDefault();
    this.props.eventsContainerPopupClose();
  }

  createEventsTemplate (event, index) {
    let eventKey = date.originalKey();
    return (
      <Event key={eventKey + index} event={event} />
    );
  }

  defineDayEvents (id) {
    return this.props.events.filter((event) => event.date === id );
  }

  render () {
    let events = this.defineDayEvents(this.props.dayId);
    let eventsTemplate = events.map(this.createEventsTemplate.bind(this));
    console.log(this.props.visibility);
    let eventsContainerClass = classNames('events-container-popup', {
      'events-container-popup--visible': this.props.visibility
    });
    let style = {
      top: this.props.position.top,
      left: this.props.position.left,
      width: EVENT_CONTAINER_POPUP_WIDTH + 'px'
    }

    console.log(style.width);
    console.log(style.top);
    console.log(style.left);

    return (
      <div className={eventsContainerClass} style={style}>
        <p className="events-container-popup__date">{this.props.dayId}</p>
        {eventsTemplate}
        <div className="events-container-popup__close">
          <a href="#" onClick={this.onCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
};

EventsContainerPopup.propTypes = {
  events: React.PropTypes.array.isRequired,
  visibility: React.PropTypes.bool.isRequired,
  position: React.PropTypes.object.isRequired,
  dayId: React.PropTypes.string,
  eventsContainerPopupClose: React.PropTypes.func.isRequired
}

export default EventsContainerPopup;
