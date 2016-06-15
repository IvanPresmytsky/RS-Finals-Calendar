import React, { Component } from 'react';

import { moveAt, countAddEventPosition, getCoords } from '../../utils/position.js';

import '../../stylesheets/components/monthView/event.css';

export class Event extends Component {

  constructor (cursorPosition = '') {
    super();
    this.cursorPosition = cursorPosition;
  }

  defineTargetDragged (e) {
    if (e.target.dataset.name ==='event') return e.target;
    if (e.target.parentNode.dataset.name ==='event') return e.target.parentNode;
    return false;
  }

  defineTargetDroppedDate (e) {
    console.log(e);
    let dropped = document.elementFromPoint(e.pageX, e.pageY);
    if (dropped.dataset.name === 'monthDay') return dropped.id;
    if (dropped.parentNode.dataset.name === 'monthDay') return dropped.parentNode.id
    if (dropped.parentNode.parentNode.dataset.name === 'monthDay') return dropped.parentNode.parentNode.id
    return this.props.event.date;
  }

  onEventMouseDown (e) {
    let event = this.defineTargetDragged(e);
    if (!event) return;
    //if(e.which != 1) return;
    let monthBody = document.getElementsByClassName('month-body')[0];
    let eventWidth = event.offsetWidth + 'px';
    let coords = getCoords(event);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;
    let currentX = e.pageX;
    let currentY = e.pageY;
    this.cursorPosition = e.pageX + '/' + e.pageY;
    event.classList.add('event--position-absolute');
    event.style.width = eventWidth;

    let positionAPI = {
      event,
      monthBody,
      shiftX,
      shiftY
    };

    monthBody.onmousemove = function(e) {
      let moveX = e.pageX - currentX;
      let moveY = e.pageY - currentY;
      if ( Math.abs(moveX) < 5 && Math.abs(moveY) < 5 ) return;
      moveAt(e, positionAPI);
    };

    document.onselectstart = function(e) {
      return false;
    }

  }

  onDragStart (e) {
    return false;
  }

  onEventClick (e) {
    let eventPosition = e.target.getBoundingClientRect();
    let position = countAddEventPosition(eventPosition);
    let event = this.props.event;
    this.props.openEventMenu(event, position);
  }

  eventDrop (e) {
    let event = this.defineTargetDragged(e);
    let monthBody = document.getElementsByClassName('month-body')[0];
    if (!event) {
      this.props.addEvent(this.props.event, "2016-05-01");
      return;
    }

    event.style.width = "";
    event.classList.add('event--hidden');

    let newDate = this.defineTargetDroppedDate(e);
    console.log(newDate);
    event.classList.remove('event--hidden');
    this.props.addEvent(this.props.event, newDate);
    event.classList.remove('event--position-absolute');
    monthBody.onmousemove = null;
  }

  onEventMouseUp (e) {
    if (this.cursorPosition === (e.pageX + '/' + e.pageY)) this.onEventClick(e);
    else this.eventDrop(e);
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
        onMouseDown={this.onEventMouseDown.bind(this)}
        onMouseUp={this.onEventMouseUp.bind(this)}
        onDragStart={this.onDragStart.bind(this)}
      >
        <span className="event-title">{event.title}</span>
        <span className="event-time">{event.startTime}</span>
      </div>
    );
  }
};

Event.propTypes = {
  event: React.PropTypes.object.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired
}

export default Event;
