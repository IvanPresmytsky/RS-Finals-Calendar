import classNames from 'classnames';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeNotificationPopup } from '../actions/popups.js';

import '../stylesheets/components/notificationPopup.css';

export class NotificationPopup extends Component {
  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.closeNotificationPopup();
  }

  render() {
    let event = this.props.actualEvent;
    let eventTitle = event ? event.title : '';
    let eventText = event ? event.text : '';
    let popupClass = classNames('notification-popup', {
      ' popup-visible': this.props.visibility
    });
    return (
      <div className={popupClass}>
        <p className="notification-popup__title">
          Attention!!!
        </p>
        <p className="notification-popup__event-title">
          {eventTitle}
        </p>
        <p className="notification-popup__event-text">
          {eventText}
        </p>
        <div className="notification-popup__close">
          <a href="#" onClick={this.onBtnCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
}

NotificationPopup.propTypes = {
  actualEvent: React.PropTypes.object,
  visibility: React.PropTypes.bool.isRequired,
  closeNotificationPopup: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    actualEvent: state.popups.notificationPopupEvent,
    visibility: state.popups.notificationPopupVisibility
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeNotificationPopup: bindActionCreators(closeNotificationPopup, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPopup);
