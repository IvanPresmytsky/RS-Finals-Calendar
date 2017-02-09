import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closePopup } from '../popups/popups_actions.js';
import { openMessagePopup } from '../popups/message_popup/message_popup_actions';
import { openDeleteUserPopup } from '../popups/delete_user_popup/delete_user_popup_actions';
import { editUser } from './user_settings_actions';

export class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.onEditPasswordBtnClick = this.onEditPasswordBtnClick.bind(this);
    this.onEditUsernameBtnClick = this.onEditUsernameBtnClick.bind(this);
    this.onDeleteUserBtnClick = this.onDeleteUserBtnClick.bind(this);
  }

  componentDidMount() {
    if (this.props.username && this.newUsername) {
      this.newUsername.value = this.props.username;
    }
  }

  onEditPasswordBtnClick(e) {
    e.preventDefault();
    let editUserData = {
      password: this.password.value,
      newPassword: this.newPassword.value,
      confirmedNewPassword: this.confirmedNewPassword.value,
      newUsername: this.props.username,
      token: sessionStorage.token
    };
    if (editUserData.newPassword === editUserData.confirmedNewPassword) {
      this.props.editUser(editUserData, this.props.userId);
    } else {
      this.props.openMessagePopup({message: 'newPassword and confirmedNewPassword fields should be equal!'});
    }
    this.clearForm();
  }

  onEditUsernameBtnClick(e) {
    e.preventDefault();
    let editUserData = {
      password: this.password.value,
      newPassword: this.newPassword.value,
      confirmedNewPassword: this.confirmedNewPassword.value,
      newUsername: this.newUsername.value,
      token: sessionStorage.token
    };
    this.props.editUser(editUserData, this.props.userId);
  }

  onDeleteUserBtnClick(e) {
    e.preventDefault();
    this.props.openDeleteUserPopup();
  }

  clearForm () {
    this.password.value = '';
    this.newPassword.value = '';
    this.confirmedNewPassword.value = '';
  }

  render() {
    return (
      <div className="user-settings">
        <h2 className="user-settings__title">User settings</h2>

        <div className="user-settings__edit-password">
          <form className="user-settings__edit-password-form">
            <h3 className="user-settings__edit-password-title">Edit password</h3>
            <p className="user-settings__edit-password-text">Password</p>
            <input 
              type="password" 
              className="user-settings__edit-password-password" 
              placeholder="enter password"
              defaultValue=""
              ref={password => (this.password = password)}
            />
            <p className="user-settings__edit-password-text">New password</p>
            <input 
               type="password" 
               className="user-settings__edit-password-new-password" 
               placeholder="enter new password"
               defaultValue=""
               ref={newPassword => (this.newPassword = newPassword)}
            />
            <p className="user-settings__edit-password-text">Confirm new password</p>
            <input 
               type="password" 
               className="user-settings__edit-password-title-confirm-password" 
               placeholder="confirm new password"
               defaultValue=""
               ref={confirmedNewPassword => (this.confirmedNewPassword = confirmedNewPassword)}
            />
            <input 
             type="submit" 
             className="user-settings__edit-password-submit" 
             value="edit password"
             ref={submit => (this.editPasswordBtn = submit)}
             onClick={this.onEditPasswordBtnClick}
           />
          </form>
        </div>

        <div className="user-settings__edit-username">
          <form className="user-settings__edit-username-form">
            <h3 className="user-settings__edit-username-title">Edit username</h3>
            <p className="user-settings__edit-username-text">New user name</p>
            <input 
              type="text" 
              className="user-settings__edit-username-username" 
              placeholder="enter new username"
              defaultValue=""
              ref={newUsername => (this.newUsername = newUsername)}
            />
            <input 
              type="submit" 
              className="user-settings__edit-username-submit" 
              value="edit user"
              ref={submit => (this.editUserBtn = submit)}
              onClick={this.onEditUsernameBtnClick}
            />
          </form>
        </div>

        <div className="user-settings__delete_user">
          <form className="user-settings__delete-user-form">
            <h3 className="user-settings__delete-user-title">Delete user</h3>
            <p className="user-settings__delete-user-text">Are you sure to delete user?</p>
            <input 
              type="submit" 
              className="user-settings__delete-user-submit" 
              value="delete user"
              ref={submit => (this.deleteUserBtn = submit)}
              onClick={this.onDeleteUserBtnClick}
            />
          </form>
        </div>

      </div>
    );
  }
}

UserSettings.propTypes = {
  closePopup: React.PropTypes.func.isRequired,
  openMessagePopup: React.PropTypes.func.isRequired,
  openDeleteUserPopup: React.PropTypes.func.isRequired,
  editUser: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string,
  username: React.PropTypes.string
}

function mapStateToProps (state) {
  return {
    userId: state.authorization.id,
    username: state.authorization.username
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closePopup: bindActionCreators(closePopup, dispatch),
    openMessagePopup: bindActionCreators(openMessagePopup, dispatch),
    openDeleteUserPopup: bindActionCreators(openDeleteUserPopup, dispatch),
    editUser: bindActionCreators(editUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
