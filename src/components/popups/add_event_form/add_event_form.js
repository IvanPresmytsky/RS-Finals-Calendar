import classNames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addEvent, saveEvent, editEvent } from '../../../actions/events';
import { closePopup } from '../popups_actions';
import { openMessagePopup } from '../message_popup/message_popup_actions';
import * as popupTypes from '../popups_actions';
import { SET_FILTER_MONTH, SET_FILTER_SCHEDULE } from '../../../constants/actions.js';

import './add_event_form.css';

export class AddEventForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddBtnClick = this.onAddBtnClick.bind(this);
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.eventName).focus();
    this.submit.value = 'add event';
    if (this.props.editedEvent) {
      let event = this.props.editedEvent;

      this.eventName.value = event.title;
      this.eventDescription.value = event.text;
      this.eventDate.value = event.date;
      this.eventStartTime.value = event.startTime;
      this.eventEndTime.value = event.endTime;
      this.submit.value = 'change event';
    }
  }

  clearForm () {
    this.eventName.value = '';
    this.eventDescription.value = '';
    this.eventStartTime.value = '00:00';
    this.eventEndTime.value = '00:00';
    this.eventDate.value = null;
  }

  createEvent() {
    let title = this.eventName.value.trim();
    let text = this.eventDescription.value.trim();
    let date = this.eventDate.value || this.props.defaultDate;
    let startTime = this.eventStartTime.value;
    let endTime = this.eventEndTime.value;

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
    this.clearForm();
    this.props.closePopup();
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
  }

  onAddBtnClick(e) {
    e.preventDefault();
    
    if (this.props.userId) {
      let event = this.createEvent();
      this.saveEvent(event, this.props.userId);
      this.props.closePopup();
    } else {
      this.props.openMessagePopup({message: 'please sign in to start'});
    }
    this.clearForm();
  }

  render () {
    let defaultDate = this.props.defaultDate;
    let required = defaultDate ? '' : 'required';

    let dateBlockClass = classNames('add-event-form__date-block', {
      ' block-hidden': defaultDate
    });

    return (
      <div className="add-event-popup">
        <form className="add-event-form" onSubmit={this.onSubmit} >
          <div className="add-event-form__title-block">
            <p>event title</p>
            <input
              type="text"
              className="add-event-form__event-name"
              placeholder="enter task name"
              ref={eventName => (this.eventName = eventName)}
              required
            />
          </div>
          <div className="add-event-form__description-block">
            <p>event description</p>
            <textarea
              className="add-event-form__event-description"
              placeholder="enter task description"
              ref={eventDescription => (this.eventDescription = eventDescription)}
            >
            </textarea>
          </div>
          <div className={dateBlockClass}>
            <span>event date</span>
            <input
              type="date"
              className="add-event-form__event-date"
              ref={eventDate => (this.eventDate = eventDate)}
              required = {required}
            />
          </div>
          <div className="add-event-form__time-block">
            <span className="time-block__text-from">from</span>
            <input
              type="time"
              className="add-event-form__event-start-time"
              ref={eventStartTime => (this.eventStartTime = eventStartTime)}
              required
            />
            <span className="time-block__text-to">to</span>
            <input
              type="time"
              className="add-event-form__event-end-time"
              ref={eventEndTime => (this.eventEndTime = eventEndTime)}
            />
          </div>
          <div className="add-event-form__submit-block">
            <input
              type="submit"
              className="add-event-form__submit"
              ref={submit => this.submit = submit}
              onClick={this.onAddBtnClick}
            />
          </div>
        </form>
      </div>
    );
  }
};

AddEventForm.propTypes = {
  userId: React.PropTypes.string,
  defaultDate: React.PropTypes.string,
  editedEvent: React.PropTypes.object,
  closePopup: React.PropTypes.func.isRequired,
  openMessagePopup: React.PropTypes.func.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  saveEvent: React.PropTypes.func.isRequired,
  editEvent: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    userId: state.authorization.id,
    defaultDate: state.popup_reducer.popupOptions.defaultDate,
    editedEvent: state.events.editedEvent,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addEvent: bindActionCreators(addEvent, dispatch),
    saveEvent: bindActionCreators(saveEvent, dispatch),
    editEvent: bindActionCreators(editEvent, dispatch),
    closePopup: bindActionCreators(closePopup, dispatch),
    openMessagePopup: bindActionCreators(openMessagePopup, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEventForm);
