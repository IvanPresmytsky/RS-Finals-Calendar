import classNames from 'classnames';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeEditUserForm, openMessagePopup } from '../actions/popups.js';
import { editUser } from '../actions/authorization.js';

import '../stylesheets/components/editUserForm.css';

export class EditUserForm extends Component {
  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.closeEditUserForm();
    this.clearForm();
  }

  clearForm () {
    this.refs.password.value = '';
    this.refs.newPassword.value = '';
    this.refs.confirmedNewPassword.value = '';
    this.refs.newUsername.value = '';
  }

  onSubmit(e) {
    e.preventDefault();
    let editUserData = {
      password: this.refs.password.value,
      newPassword: this.refs.newPassword.value,
      confirmedNewPassword: this.refs.confirmedNewPassword.value,
      newUsername: this.refs.newUsername.value,
      token: sessionStorage.token
    };
    if (editUserData.newPassword === editUserData.confirmedNewPassword) {
      this.props.editUser(editUserData, this.props.userId);
      this.props.closeEditUserForm();
    } else {
      this.props.openMessagePopup('newPassword and confirmedNewPassword fields should be equal!');
    }
    this.clearForm();
  }

  render () {
    let popupClass = classNames('edit-user-popup', {
      ' popup-visible': this.props.visibility
    });
    if (this.props.username && this.refs.newUsername) {
      this.refs.newUsername.value = this.props.username;
    }

    return (
      <div className={popupClass}>
        <form className="edit-user-form" onSubmit={this.onSubmit.bind(this)}>
           <p>Password</p>
           <input 
             type="password" 
             className="edit-user-form__password" 
             placeholder="enter password"
             defaultValue=""
             ref="password"
           />
           <p>New password</p>
           <input 
             type="password" 
             className="edit-user-form__new-password" 
             placeholder="enter new password"
             defaultValue=""
             ref="newPassword"
           />
           <p>Confirm new password</p>
           <input 
             type="password" 
             className="edit-user-form__confirm-password" 
             placeholder="confirm new password"
             defaultValue=""
             ref="confirmedNewPassword"
           />
           <p>New user name</p>
           <input 
             type="text" 
             className="edit-user-form__new-username" 
             placeholder="enter new username"
             defaultValue=""
             ref="newUsername"
           />
           <input 
             type="submit" 
             className="edit-user-form__submit" 
             value="edit user"
             ref="submit"
           />
        </form>
        <div className="edit-user-popup__close">
          <a href="#" onClick={this.onBtnCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
}

EditUserForm.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  closeEditUserForm: React.PropTypes.func.isRequired,
  openMessagePopup: React.PropTypes.func.isRequired,
  editUser: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string,
  username: React.PropTypes.string
}

function mapStateToProps (state) {
  return {
    visibility: state.popups.editUserFormVisibility,
    userId: state.authorization.id,
    username: state.authorization.username
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeEditUserForm: bindActionCreators(closeEditUserForm, dispatch),
    openMessagePopup: bindActionCreators(openMessagePopup, dispatch),
    editUser: bindActionCreators(editUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
