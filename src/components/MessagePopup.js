import classNames from 'classnames';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeMessagePopup } from '../actions/popups.js';

import '../stylesheets/components/messagePopup.css';

export class MessagePopup extends Component {
  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.closeMessagePopup();
  }

  onOkBtnClick (e) {
    e.preventDefault();
    this.props.closeMessagePopup();
  }


  render() {
    let message = this.props.message;
    let popupClass = classNames('message-popup', {
      ' popup-visible': this.props.visibility
    });
    return (
      <div className={popupClass}>
        <p className="message-popup__message">
          {message}
        </p>
        <a 
          href="#" 
          className="message-popup__ok-btn"
          onClick={this.onOkBtnClick.bind(this)}
        >
          OK
        </a>
        <div className="message-popup__close">
          <a href="#" onClick={this.onBtnCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
}

MessagePopup.propTypes = {
  message: React.PropTypes.string,
  visibility: React.PropTypes.bool.isRequired,
  closeMessagePopup: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    message: state.popups.messagePopupMessage,
    visibility: state.popups.messagePopupVisibility
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeMessagePopup: bindActionCreators(closeMessagePopup, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePopup);
