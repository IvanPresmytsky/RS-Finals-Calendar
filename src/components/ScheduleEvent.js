import classNames from 'classnames';
import React, { Component } from 'react';

import '../stylesheets/components/scheduleEvent.css';

import { countAddEventPosition } from '../utils/position.js';

export class ScheduleEvent extends Component{
  onDelBtnClick (e) {
    e.preventDefault();
    this.props.deleteEvent(this.props.event);
  }

  onChangeEventBtnClick (e) {
    e.preventDefault();
    let dayPosition = e.target.getBoundingClientRect();
    let addEventPosition = countAddEventPosition(dayPosition);
    console.log(this.props.changeEvent);
    console.log(this.props.event);
    this.props.changeEvent(this.props.event);
    this.props.addEventOpen(addEventPosition);
  }

  render () {
    let event = this.props.event;
    let bodyWidth = document.body.offsetHeight;
    console.log(bodyWidth);
     
    let eventsBlock = document.getElementsByClassName('schedule-event');
    if (eventsBlock.length > 0) {
      var pagination = document.getElementsByClassName('scedule__pagination')[0];
      var paginationWidth = pagination.offsetHeight;
      var eventWidths = Array.from(eventsBlock, (e) => e.offsetHeight);
      var eventWidth = eventWidths.reduce( (t, c) => t + c );
      var totalWidth = eventWidth + 90 + paginationWidth + 100;
    }
    
    let eventClass = classNames('schedule-event', {
      'hidden-event': totalWidth && (totalWidth > bodyWidth)
    });

    return (
      <li className = {eventClass}>
        <p className = "schedule-event__date">{event.date}</p>
        <p className = "schedule-event__time">{event.startTime + ' - ' + event.endTime}</p>
        <p className = "schedule-event__title">{event.title}</p>
        <p className = "schedule-event__description">{event.text}</p>
        <div className="schedule-buttons">
          <button type="button" className = "schedule-buttons__change-btn" onClick={this.onChangeEventBtnClick.bind(this)}> change event </button>
          <button type="button" className = "schedule-buttons__delete-btn" onClick={this.onDelBtnClick.bind(this)}> delete </button>
        </div>
      </li>
    );
  }
};

ScheduleEvent.propTypes = {
  event: React.PropTypes.object.isRequired,
  addEventOpen: React.PropTypes.func.isRequired,
  changeEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired
}

export default ScheduleEvent;
