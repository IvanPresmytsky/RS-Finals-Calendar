import classNames from 'classnames';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeDeleteUserPopup } from '../actions/popups.js';
import { deleteUser } from '../actions/authorization.js';

import '../stylesheets/components/deleteUserPopup.css';

export class DeleteUserPopup extends Component {
  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.closeDeleteUserPopup();
    this.clearForm();
  }

  clearForm () {
    this.refs.password.value = '';
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.deleteUser(this.refs.password.value, this.props.userId);
    this.props.closeDeleteUserPopup();
    this.clearForm();
  }

  render () {
    let popupClass = classNames('delete-user-popup', {
      ' popup-visible': this.props.visibility
    });

    return (
      <div className={popupClass}>
        <form className="delete-user-form" onSubmit={this.onSubmit.bind(this)}>
           <p>To confirm deletion, please enter your password</p>
           <input 
             type="password" 
             className="delete-user-form__password" 
             placeholder="enter password"
             defaultValue=""
             ref="password"
           />
           <input 
             type="submit" 
             className="delete-user-form__submit" 
             value="delete user"
             ref="submit"
           />
        </form>
        <div className="delete-user-popup__close">
          <a href="#" onClick={this.onBtnCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
}

DeleteUserPopup.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  userId: React.PropTypes.string
}

function mapStateToProps (state) {
  return {
    visibility: state.popups.deleteUserPopupVisibility,
    userId: state.authorization.id
  };
}

function mapDispatchToprops (dispatch) {
  return {
    closeDeleteUserPopup: bindActionCreators(closeDeleteUserPopup, dispatch),
    deleteUser: bindActionCreators(deleteUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToprops)(DeleteUserPopup);
