import AddEventForm from './add_event_form/add_event_form';
import DeleteUserPopup from './delete_user_popup/delete_user_popup';
import EditUserForm from './edit_user_form/edit_user_form';
import EventMenu from './event_menu/event_menu';
import MessagePopup from './message_popup/message_popup';
import RegisterForm from './register_form/register_form';
import LoginForm from './login_form/login_form';
import Modal from 'react-modal';
import NotificationPopup from './notification_popup/notification_popup';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { closePopup } from './popups_actions';
import { connect } from 'react-redux';

import * as popupTypes from './popups_actions';
import './popup.css';


export class Popup extends Component {
  constructor(props) {
    super(props);
    this.getPopupType = this.getPopupType.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup(e) {
    this.props.closePopup();
  }

  getPopupType(popupType) {
    switch(popupType) {
      case popupTypes.DELETE_USER_POPUP:
        return <DeleteUserPopup />;
      case popupTypes.MESSAGE_POPUP:
        return <MessagePopup />;
      case popupTypes.NOTIFICATION_POPUP:
        return <NotificationPopup />
      case popupTypes.ADD_EVENT_FORM:
        return <AddEventForm />;
      case popupTypes.EDIT_USER_FORM:
        return <EditUserForm />;
      case popupTypes.EVENT_MENU:
        return <EventMenu />;
      case popupTypes.LOGIN_FORM:
        return <LoginForm />;
      case popupTypes.REGISTER_FORM:
        return <RegisterForm />;
      default:
        throw new Erorr('invalid popup type!');
    }
  }

  render() {
    let popup = this.getPopupType(this.props.popupType);
    // overlayClassName doesn't work
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.closePopup}
        contentLabel="Delete user popup"
        className="popup"
      >
        {popup}
        <div className="popup-close">
          <a href="#" className="popup_close__btn" onClick={this.closePopup}>X</a>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpen: state.popup_reducer.isPopupOpen,
    popupType: state.popup_reducer.popupType,
  };
}

function mapDispathcToProps(dispatch) {
  return {
    closePopup: bindActionCreators(closePopup, dispatch),
  };
}

export default connect(mapStateToProps, mapDispathcToProps)(Popup);
