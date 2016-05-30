import classNames from 'classnames';
import React, { Component } from 'react';

import '../../stylesheets/components/monthViewComponents/eventOptionsPopup.css';

export class EventOptionsPopup extends Component {
  onCloseClick (e) {
    e.preventDefault();
    this.props.eventOptionsPopupClose();
  }

  onChangeBtnClick (e) {
    e.preventDefault();
    this.props.changeEvent(this.props.event);
    this.props.eventOptionsPopupClose();
    let position = e.target.parentNode.parentNode.getBoundingClientRect();
    this.props.addEventOpen(position);
  }

  onDeleteBtnClick (e) {
    e.preventDefault();
    this.props.deleteEvent(this.props.event);
    this.props.eventOptionsPopupClose();
  }

  render () {
    let event = this.props.event;
    let title = event ? event.title : '';
    let text = event ? event.text : '';
    let date= event ? event.date : '';
    let time = event ? `${event.startTime} - ${event.endTime}` : '';
    let popupClass = classNames('event-options-popup', {
      'event-options-popup--visible': this.props.visibility
    })
    let style = {
      top: this.props.position.top,
      left: this.props.position.left,
    }
    return (
      <div className={popupClass} style={style}>
        <p className="event-options-popup__title">{title}</p>
        <p className="event-options-popup__description">{text}</p>
        <p className="event-options-popup__date">{date}</p>
        <p className="event-options-popup__time">{time}</p>
        <div className="event-options-popup-buttons">
          <button 
            type="button" 
            className="event-options-popup__change-btn"
            onClick={this.onChangeBtnClick.bind(this)}
          >
            change event 
          </button>
          <button 
            type="button" 
            className="event-options-popup__delete-btn"
            onClick={this.onDeleteBtnClick.bind(this)}
          > 
            delete event 
          </button>
        </div>
        <div className="event-options-popup__close">
          <a href="#" onClick={this.onCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
}

EventOptionsPopup.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  position: React.PropTypes.object.isRequired,
  event: React.PropTypes.object,
  eventOptionsPopupClose: React.PropTypes.func.isRequired,
  addEventOpen: React.PropTypes.func.isRequired,
  changeEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired
}

export default EventOptionsPopup;
