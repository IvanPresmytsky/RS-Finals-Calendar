
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closePopup } from '../popups_actions.js';
import { openMessagePopup } from '../message_popup/message_popup_actions.js';
import { editUser } from '../../../actions/authorization.js';

import './edit_user_form.css';

export class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditBtnClick = this.onEditBtnClick.bind(this);
  }

  clearForm () {
    this.password.value = '';
    this.newPassword.value = '';
    this.confirmedNewPassword.value = '';
    this.newUsername.value = '';
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onEditBtnClick(e) {
    let editUserData = {
      password: this.password.value,
      newPassword: this.newPassword.value,
      confirmedNewPassword: this.confirmedNewPassword.value,
      newUsername: this.newUsername.value,
      token: sessionStorage.token
    };
    if (editUserData.newPassword === editUserData.confirmedNewPassword) {
      this.props.editUser(editUserData, this.props.userId);
      this.props.closeEditUserForm();
    } else {
      this.props.openMessagePopup({message: 'newPassword and confirmedNewPassword fields should be equal!'});
    }
    this.clearForm();
  }

  render () {
    if (this.props.username && this.newUsername) {
      this.newUsername.value = this.props.username;
    }

    return (
      <div className="edit-user-popup">
        <form className="edit-user-form" onSubmit={this.onSubmit}>
           <p>Password</p>
           <input 
             type="password" 
             className="edit-user-form__password" 
             placeholder="enter password"
             defaultValue=""
             ref={password => (this.password = password)}
           />
           <p>New password</p>
           <input 
             type="password" 
             className="edit-user-form__new-password" 
             placeholder="enter new password"
             defaultValue=""
             ref={newPassword => (this.newPassword = newPassword)}
           />
           <p>Confirm new password</p>
           <input 
             type="password" 
             className="edit-user-form__confirm-password" 
             placeholder="confirm new password"
             defaultValue=""
             ref={confirmedNewPassword => (this.confirmedNewPassword = confirmedNewPassword)}
           />
           <p>New user name</p>
           <input 
             type="text" 
             className="edit-user-form__new-username" 
             placeholder="enter new username"
             defaultValue=""
             ref={newUsername => (this.newUsername = newUsername)}
           />
           <input 
             type="submit" 
             className="edit-user-form__submit" 
             value="edit user"
             ref={submit => (this.submit = submit)}
             onClick={this.onEditBtnClick}
           />
        </form>
      </div>
    );
  }
}

EditUserForm.propTypes = {
  closePopup: React.PropTypes.func.isRequired,
  openMessagePopup: React.PropTypes.func.isRequired,
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
    editUser: bindActionCreators(editUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
