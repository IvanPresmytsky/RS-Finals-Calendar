import classNames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../stylesheets/components/addEvent.css';

import { eventAdded, changeEvent, eventChanged, addEventClose } from '../actions/events.js';

import { ADD_EVENT_WIDTH, ADD_EVENT_HEIGHT } from '../constants/handlersConstants.js';
import { SET_FILTER_MONTH, SET_FILTER_SCHEDULE } from '../constants/actions.js';

export class AddEvent extends Component {
  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.eventName).focus();
  }

  createEvent() {
    let title = this.refs.eventName.value.trim();
    let text = this.refs.eventDescription.value.trim();
    let date = this.refs.eventDate.value || this.props.defaultDate;
    let startTime = this.refs.eventStartTime.value;
    let endTime = this.refs.eventEndTime.value;
    let color = this.refs.color.value;

    return {
      id: title + date + startTime,
      title: title,
      text: text,
      date: date,
      startTime: startTime,
      endTime: endTime,
      color: color
    };
  }

  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.addEventClose();
  }

  onSubmit (e) {
    e.preventDefault();
    let event = this.createEvent();

    if (this.props.eventForChange) {
      this.props.eventChanged(this.props.eventForChange, event);
      this.props.changeEvent(null);
    } else {
      this.props.createEvent(event);
      this.props.changeEvent(null);
    }

    this.props.addEventClose();
    this.refs.eventDate.value = null;
  }

  render () {
    let position = this.props.position;
    let defaultDate = this.props.defaultDate;
    console.log(defaultDate);
    let top = position ? position.top : 0;
    let left = position ? position.left : 0;
    let style = {
      top: top,
      left: left,
      width: ADD_EVENT_WIDTH,
      height: ADD_EVENT_HEIGHT
    };

    
    let required = defaultDate ? '' : 'required';

    let popupClass = classNames('add-event-popup', {
      ' popup-visible': this.props.visibility
    });
    let dateBlockClass = classNames('add-event-form__date-block', {
      ' block-hidden': defaultDate
    });

    let eventTitle = '';
    let eventDescription = '';
    let eventDate = '';
    let eventStartTime = '00:00';
    let eventEndTime = '00:00';
    let submitText = 'add event';
    let eventColor = 'yellow';

    if (this.props.eventForChange) {
      let event = this.props.eventForChange;
      eventTitle = event.title;
      eventDescription = event.text;
      eventDate = event.date;
      eventStartTime = event.startTime;
      eventEndTime = event.endTime;
      eventColor = event.color;
      submitText = 'change event';

    }

    return (
      <div className={popupClass} style={style}>
        <form className="add-event-form" onSubmit={this.onSubmit.bind(this)} >
          <div className="add-event-form__title-block">
            <p>event title</p>
            <input
              type="text"
              className="add-event-form__event-name"
              placeholder="enter task name"
              defaultValue={eventTitle}
              ref="eventName"
              required
            />
          </div>
          <div className="add-event-form__description-block">
            <p>event description</p>
            <textarea
              className="add-event-form__event-description"
              placeholder="enter task description"
              defaultValue={eventDescription}
              ref="eventDescription"
            >
            </textarea>
          </div>
          <div className={dateBlockClass}>
            <span>event date</span>
            <input
              type="date"
              className="add-event-form__event-date"
              defaultValue={eventDate}
              ref="eventDate"
              required = {required}
            />
          </div>
          <div className="add-event-form__time-block">
            <span>from</span>
            <input
              type="time"
              className="add-event-form__event-start-time"
              defaultValue={eventStartTime}
              ref="eventStartTime"
              required
            />
            <span>to</span>
            <input
              type="time"
              className="add-event-form__event-end-time"
              defaultValue={eventEndTime}
              ref="eventEndTime"
            />
          </div>
          <div className="add-event-form__color-block">
            <span>event color</span>
            <input
              type="color"
              className="add-event-form__color"
              defaultValue={eventColor}
              ref="color"
            />
          </div>
          <div className="add-event-form__submit-block">
            <input
              type="submit"
              className="add-event-form__submit"
              value={submitText}
              ref="submit"
            />
          </div>
        </form>
        <div className="add-event-popup__close">
         <a href="#" onClick={this.onBtnCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
};

AddEvent.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  defaultDate: React.PropTypes.string,
  position: React.PropTypes.object,
  eventForChange: React.PropTypes.object,
  addEventClose: React.PropTypes.func.isRequired,
  createEvent: React.PropTypes.func.isRequired,
  changeEvent: React.PropTypes.func.isRequired,
  eventChanged: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    visibility: state.addEvent.visibility,
    defaultDate: state.addEvent.defaultDate,
    position: state.addEvent.position,
    eventForChange: state.addEvent.eventForChange,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createEvent: bindActionCreators(eventAdded, dispatch),
    changeEvent: bindActionCreators(changeEvent, dispatch),
    eventChanged: bindActionCreators(eventChanged, dispatch),
    addEventClose: bindActionCreators(addEventClose, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
