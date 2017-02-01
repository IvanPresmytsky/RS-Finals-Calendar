import classNames from 'classnames';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closePopup } from '../popups_actions';

import './message_popup.css';

export class MessagePopup extends Component {
  constructor(props) {
    super(props);
    this.onOkBtnClick = this.onOkBtnClick.bind(this);
  }

  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.closePopup();
  }

  onOkBtnClick (e) {
    e.preventDefault();
    this.props.closePopup();
  }


  render() {
    let message = this.props.message || 'no message' ;

    return (
      <div className='message-popup'>
        <p className="message-popup__message">
          {message}
        </p>
        <a 
          href="#" 
          className="message-popup__ok-btn"
          onClick={this.onOkBtnClick}
        >
        OK
        </a>
      </div>
    );
  }
}

MessagePopup.propTypes = {
  message: React.PropTypes.string,
  closePopup: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    message: state.popups.popupOptions.message,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closePopup: bindActionCreators(closePopup, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePopup);
