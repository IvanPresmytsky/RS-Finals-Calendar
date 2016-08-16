import React, { Component } from 'react';

import { moveAt, countAddEventPosition, getCoords } from '../../utils/position.js';

import '../../stylesheets/components/monthView/event.css';

export class Event extends Component {

  constructor (cursorPosition = '') {
    super();
    this.cursorPosition = cursorPosition;
  }

  findTargetDragged (e) {
    let target = e.target;
    while (target.dataset.name !=='event') {
      target = target.parentNode;
    }
    return target;
  }

  findTargetDroppedDate (e) {
    let dropped = document.elementFromPoint(e.pageX, e.pageY);
    while (dropped.dataset.name !== 'monthDay') {
      dropped = dropped.parentNode;
    }
    return dropped ? dropped.id : this.props.event.date;
  }

  onMouseMove (e) {
    let moveX = e.pageX - this.currentX;
    let moveY = e.pageY - this.currentY;

    if ( Math.abs(moveX) < 5 && Math.abs(moveY) < 5 ) return;
    moveAt(e, this.positionAPI);
  }

  onSelectStart (e) {
    return;
  }


  onEventMouseDown (e) {
    let event = this.findTargetDragged(e);
    if (!event) return;
    let monthBody = document.getElementsByClassName('month-body')[0];
    let eventWidth = event.offsetWidth + 'px';
    let coords = getCoords(event);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;
    
    this.currentX = e.pageX;
    this.currentY = e.pageY;

    this.cursorPosition = e.pageX + '/' + e.pageY;
    event.classList.add('event--position-fixed');

    event.style.width = eventWidth;
    event.style.top = coords.top + 'px';
    event.style.left = coords.left + 'px';

    this.positionAPI = {
      event,
      monthBody,
      shiftX,
      shiftY
    };

    monthBody.addEventListener('mousemove', this.onMouseMove.bind(this));

    document.onselectstart = function(e) {
      return false;
    };

   // document.addEventListener('selectstart', this.onSelectStart.bind(this));
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
    let event = this.findTargetDragged(e);
    let monthBody = document.getElementsByClassName('month-body')[0];
    if (!event) {
      this.props.addEvent(this.props.event, "2016-05-01");
      return;
    }

    event.style.width = "";
    event.classList.add('event--hidden');

    let newDate = this.findTargetDroppedDate(e);
    let newEvent = { ...this.props.event, date: newDate};

    event.classList.remove('event--hidden');
    this.props.saveEvent(this.props.event, newEvent, this.props.userId);
    event.classList.remove('event--position-absolute');
    monthBody.removeEventListener('mousemove', this.onMouseMove.bind(this));
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
  saveEvent: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string
}

export default Event;
