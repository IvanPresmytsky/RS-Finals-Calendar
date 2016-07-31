import classNames from 'classnames';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeEditUserForm } from '../actions/popups.js';

import '../stylesheets/components/editUserForm.css';

export class EditUserForm extends Component {
  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.closeEditUserForm();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render () {
    let popupClass = classNames('edit-user-popup', {
      ' popup-visible': this.props.visibility
    });

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
           <p>Confirm password</p>
           <input 
             type="password" 
             className="edit-user-form__confirm-password" 
             placeholder="confirm new password"
             defaultValue=""
             ref="confirmedPassword"
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
  closeEditUserForm: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    visibility: state.popups.editUserFormVisibility
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeEditUserForm: bindActionCreators(closeEditUserForm, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
