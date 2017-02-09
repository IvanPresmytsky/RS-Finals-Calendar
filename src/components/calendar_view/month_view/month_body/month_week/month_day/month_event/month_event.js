import React, { Component } from 'react';

import { moveAt, getCoords } from '../../../../../../../utils/position';

import './month_event.css';

export class MonthEvent extends Component {
  constructor (cursorPosition = '', draggedEvent) {
    super();
    this.cursorPosition = cursorPosition;
    this.draggedEvent = draggedEvent;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
    this.onEventMouseDown = this.onEventMouseDown.bind(this);
    this.onEventMouseUp = this.onEventMouseUp.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
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
    this.draggedEvent = event;
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

    monthBody.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onDocumentMouseUp);
    document.onselectstart = function(e) {
      return false;
    };
  }

  onDragStart (e) {
    return false;
  }

  onEventClick (e) {
    let event = this.props.event;
    this.props.openEventMenu({actualEvent: event});
  }

  eventDrop (e) {
    let event = this.findTargetDragged(e);
    let monthBody = document.getElementsByClassName('month-body')[0];
    if (!event) {
      this.props.addEvent(this.props.event, this.props.event.date);
      return;
    }

    event.style.width = "";
    event.classList.add('event--hidden');

    let newDate = this.findTargetDroppedDate(e);
    let newEvent = { ...this.props.event, date: newDate};

    event.classList.remove('event--hidden');
    this.props.saveEvent(this.props.event, newEvent, this.props.userId);
    monthBody.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
  }

  onDocumentMouseUp(e) {
    e.preventDefault();
    if (e.target.dataset.name !== 'event') {
      let monthBody = document.getElementsByClassName('month-body')[0];
      this.draggedEvent.classList.remove('event--position-fixed');
      monthBody.removeEventListener('mousemove', this.onMouseMove);
    }
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
  }

  onEventMouseUp (e) {
    if (this.cursorPosition === (e.pageX + '/' + e.pageY)) this.onEventClick(e);
    else {
      this.eventDrop(e);
    }
  }


  render () {
    let event = this.props.event;

    return (
      <div id={event.id} 
        className="event-body" 
        data-name="event" 
        onMouseDown={this.onEventMouseDown}
        onMouseUp={this.onEventMouseUp}
        onDragStart={this.onDragStart}
      >
        <span className="event-title">{event.title}</span>
        <span className="event-time">{event.startTime}</span>
      </div>
    );
  }
};

MonthEvent.propTypes = {
  event: React.PropTypes.object.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  openEventMenu: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string
}

export default MonthEvent;
