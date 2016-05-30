import React, { Component } from 'react';

import { moveAt, countAddEventPosition, getCoords } from '../utils/position.js';

import '../stylesheets/components/event.css';

export class Event extends Component {
/*  onEventMouseDown (e) {
     if (e.target.dataset.name !=='event') return;
     let event = e.target;
     let eventWidth = event.offsetWidth + 'px';
     event.classList.add('event--position-absolute');
     event.style.width = eventWidth;
     moveAt(e)

     return false;
  }
*/
  onEventMouseDown (e) {
    if (e.target.dataset.name !=='event') return;
    let event = e.target;
    let eventWidth = event.offsetWidth + 'px';
    var coords = getCoords(event);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;

    event.classList.add('event--position-absolute');
    event.style.width = eventWidth;
    //document.body.appendChild(event);
    moveAt(e);

    function moveAt(e) {
      event.style.left = e.pageX - shiftX + 'px';
      event.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function(e) {
      moveAt(e);
    };

  }

  onDragStart () {
    return false;
  }

  onEventClick (e) {
    e.preventDefault();
    console.log('target event');
    let eventPosition = e.target.getBoundingClientRect();
    let position = countAddEventPosition(eventPosition);
    let event = this.props.event;
    this.props.eventOptionsPopupOpen(event, position);
  }

  render () {
    let event = this.props.event;
    let style = {
      background: event.color
    }
    return (
      <div id={event.id} 
        className="event-body" 
        data-name="event" 
        style={style}
        onClick={this.onEventClick.bind(this)}
        //onMouseDown={this.onEventMouseDown.bind(this)}
        //onDragStart={this.onDragStart.bind(this)}
      >
        <span className="event-title">{event.title}</span>
        <span className="event-time">{event.startTime}</span>
      </div>
    );
  }
};

Event.propTypes = {
  event: React.PropTypes.object.isRequired,
  eventOptionsPopupOpen: React.PropTypes.func.isRequired
}

export default Event;
