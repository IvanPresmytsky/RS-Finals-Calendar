import classNames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addEvent, saveEvent, editEvent } from '../actions/events.js';
import { closeAddEventForm, openMessagePopup } from '../actions/popups.js';

import { ADD_EVENT_WIDTH, ADD_EVENT_HEIGHT } from '../constants/sizes.js';
import { SET_FILTER_MONTH, SET_FILTER_SCHEDULE } from '../constants/actions.js';

import '../stylesheets/components/addEventForm.css';

export class AddEventForm extends Component {
  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.eventName).focus();
  }

  createEvent() {
    let title = this.refs.eventName.value.trim();
    let text = this.refs.eventDescription.value.trim();
    let date = this.refs.eventDate.value || this.props.defaultDate;
    let startTime = this.refs.eventStartTime.value;
    let endTime = this.refs.eventEndTime.value;

    return {
      title: title,
      text: text,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
  }

  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.closeAddEventForm();
  }

  saveEvent (event, userId) {
    if (this.props.editedEvent) {
      this.props.saveEvent(this.props.editedEvent, event, userId);
      this.props.editEvent(null);
    } else {
      this.props.addEvent(event, userId);
      this.props.editEvent(null);
    }
  }

  onSubmit (e) {
    e.preventDefault();
    if (this.props.userId) {
      let event = this.createEvent();
      this.saveEvent(event, this.props.userId);
      this.props.closeAddEventForm();
      this.refs.eventDate.value = null
    } else {
      this.props.openMessagePopup('please sign in to start');
    }
  }

  render () {
    let position = this.props.position;
    let defaultDate = this.props.defaultDate;
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

    if (this.props.editedEvent) {
      let event = this.props.editedEvent;
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

AddEventForm.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  userId: React.PropTypes.string,
  defaultDate: React.PropTypes.string,
  position: React.PropTypes.object,
  editedEvent: React.PropTypes.object,
  closeAddEventForm: React.PropTypes.func.isRequired,
  openMessagePopup: React.PropTypes.func.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  editEvent: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    visibility: state.popups.addEventFormVisibility,
    userId: state.authorization.id,
    defaultDate: state.popups.addEventFormDefaultDate,
    position: state.popups.addEventFormPosition,
    editedEvent: state.events.editedEvent,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addEvent: bindActionCreators(addEvent, dispatch),
    saveEvent: bindActionCreators(saveEvent, dispatch),
    editEvent: bindActionCreators(editEvent, dispatch),
    closeAddEventForm: bindActionCreators(closeAddEventForm, dispatch),
    openMessagePopup: bindActionCreators(openMessagePopup, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEventForm);
