import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closePopup } from '../popups_actions';
import { openAddEventForm } from '../add_event_form/add_event_form_actions';
import { deleteEvent, editEvent } from '../../../actions/events';

import React, { Component } from 'react';

import './event_menu.css';

export class EventMenu extends Component {
  constructor(props) {
    super(props);
    this.onChangeBtnClick = this.onChangeBtnClick.bind(this);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
  }

  onChangeBtnClick (e) {
    e.preventDefault();
    let actualEvent = this.props.event;
    this.props.editEvent(actualEvent);
    this.props.closePopup();
    this.props.openAddEventForm();
  }

  onDeleteBtnClick (e) {
    e.preventDefault();
    this.props.deleteEvent(this.props.event, this.props.userId);
    this.props.closePopup();
  }

  render () {
    let event = this.props.event;
    let title = event ? event.title : '';
    let text = event ? event.text : '';
    let date= event ? event.date : '';
    let time = event ? `${event.startTime} - ${event.endTime}` : '';

    return (
      <div className="event-menu">
        <p className="event-menu__title">{title}</p>
        <p className="event-menu__description">{text}</p>
        <p className="event-menu__date">{date}</p>
        <p className="event-menu__time">{time}</p>
        <div className="event-menu-buttons">
          <button 
            type="button" 
            className="event-menu__change-btn"
            onClick={this.onChangeBtnClick}
          >
            change event
          </button>
          <button 
            type="button" 
            className="event-menu__delete-btn"
            onClick={this.onDeleteBtnClick}
          > 
            delete event
          </button>
        </div>
      </div>
    );
  }
}

EventMenu.propTypes = {
  userId: React.PropTypes.string,
  event: React.PropTypes.object,
  closePopup: React.PropTypes.func.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  editEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    event: state.popup_reducer.popupOptions.actualEvent,
    userId: state.authorization.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closePopup: bindActionCreators(closePopup, dispatch),
    openAddEventForm: bindActionCreators(openAddEventForm, dispatch),
    editEvent: bindActionCreators(editEvent, dispatch),
    deleteEvent: bindActionCreators(deleteEvent, dispatch),
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(EventMenu);
