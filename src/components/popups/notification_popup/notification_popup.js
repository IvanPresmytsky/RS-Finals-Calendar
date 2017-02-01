import classNames from 'classnames';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closenPopup } from '../popups_actions';

import './notification_popup.css';

export class NotificationPopup extends Component {
  constructor(props) {
    super(props);
    this.onOkBtnClick = this.onOkBtnClick.bind(this);
  }

  render() {
    let event = this.props.actualEvent;
    let eventTitle = event ? event.title : '';
    let eventText = event ? event.text : '';

    return (
      <div className="notification-popup">
        <p className="notification-popup__title">
          Attention!!!
        </p>
        <p className="notification-popup__event-title">
          {eventTitle}
        </p>
        <p className="notification-popup__event-text">
          {eventText}
        </p>
        <input type="button" className="notification-popup__ok-btn" onClick={this.onOkBtnClick}>
          OK
        </input>
      </div>
    );
  }
}

NotificationPopup.propTypes = {
  actualEvent: React.PropTypes.object,
  closePopup: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    actualEvent: state.popups.popupOptions.actualEvent,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closePopup: bindActionCreators(closePopup, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPopup);
