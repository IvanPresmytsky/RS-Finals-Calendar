import classNames from 'classnames';
import React, { Component } from 'react';

import '../../stylesheets/components/monthView/eventMenu.css';

export class EventMenu extends Component {
  onCloseClick (e) {
    e.preventDefault();
    this.props.closeEventMenu();
  }

  onChangeBtnClick (e) {
    e.preventDefault();
    this.props.editEvent(this.props.event);
    this.props.closeEventMenu();
    let position = e.target.parentNode.parentNode.getBoundingClientRect();
    this.props.openAddEventForm(position);
  }

  onDeleteBtnClick (e) {
    e.preventDefault();
    this.props.deleteEvent(this.props.event, this.props.userId);
    this.props.closeEventMenu();
  }

  render () {
    let event = this.props.event;
    let title = event ? event.title : '';
    let text = event ? event.text : '';
    let date= event ? event.date : '';
    let time = event ? `${event.startTime} - ${event.endTime}` : '';
    let popupClass = classNames('event-menu', {
      'event-menu--visible': this.props.visibility
    });
    let style = {
      top: this.props.position.top,
      left: this.props.position.left,
    };
    return (
      <div className={popupClass} style={style}>
        <p className="event-menu__title">{title}</p>
        <p className="event-menu__description">{text}</p>
        <p className="event-menu__date">{date}</p>
        <p className="event-menu__time">{time}</p>
        <div className="event-menu-buttons">
          <button 
            type="button" 
            className="event-menu__change-btn"
            onClick={this.onChangeBtnClick.bind(this)}
          >
            change event
          </button>
          <button 
            type="button" 
            className="event-menu__delete-btn"
            onClick={this.onDeleteBtnClick.bind(this)}
          > 
            delete event
          </button>
        </div>
        <div className="event-menu__close">
          <a href="#" onClick={this.onCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
}

EventMenu.propTypes = {
  userId: React.PropTypes.string,
  visibility: React.PropTypes.bool.isRequired,
  position: React.PropTypes.object.isRequired,
  event: React.PropTypes.object,
  closeEventMenu: React.PropTypes.func.isRequired,
  openAddEventForm: React.PropTypes.func.isRequired,
  editEvent: React.PropTypes.func.isRequired,
  deleteEvent: React.PropTypes.func.isRequired
}

export default EventMenu;
