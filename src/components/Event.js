import React, { Component } from 'react';

import { moveAt } from '../utils/position.js';

import '../stylesheets/components/event.css';

export class Event extends Component {
  onEventMouseDown (e) {
     if (e.target.dataset.name !=='event') return;
     let event = e.target;
     console.log(e.pageX);
     console.log(e.pageY);
     console.log(e.target.offsetWidth);
     let eventWidth = event.offsetWidth + 'px';
     event.classList.add('event--position-absolute');
     event.style.width = eventWidth;
     moveAt(e)

     return false;
  }

  render () {
    let event = this.props.event;
    console.log('render event');
    console.log(event);
    return (
      <div id={event.id} className="event-body" data-name="event" onMouseDown={this.onEventMouseDown.bind(this)}>
        <span className="event-title">{event.title}</span>
        <span className="event-time">{event.startTime}</span>
      </div>
    );
  }
};

Event.propTypes = {
  event: React.PropTypes.object.isRequired
}

export default Event;
