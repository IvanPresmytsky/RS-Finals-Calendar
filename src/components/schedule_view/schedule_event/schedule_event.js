import classNames from 'classnames';
import React, { Component } from 'react';

import './schedule_event.css';

export class ScheduleEvent extends Component{
  constructor(props) {
    super(props);
    this.onChangeEventBtnClick = this.onChangeEventBtnClick.bind(this);
    this.onDelBtnClick = this.onDelBtnClick.bind(this);
  }

  onDelBtnClick (e) {
    e.preventDefault();
    this.props.deleteEvent(this.props.event, this.props.userId);
  }

  onChangeEventBtnClick (e) {
    e.preventDefault();
    this.props.editEvent(this.props.event);
    this.props.openAddEventForm();
  }

  render () {
    let event = this.props.event;
    let bodyWidth = document.body.offsetHeight;
     
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
          <button type="button" className = "schedule-buttons__change-btn" onClick={this.onChangeEventBtnClick}> change event </button>
          <button type="button" className = "schedule-buttons__delete-btn" onClick={this.onDelBtnClick}> delete </button>
        </div>
      </li>
    );
  }
};

ScheduleEvent.propTypes = {
  event: React.PropTypes.object.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  editEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string
}

export default ScheduleEvent;
