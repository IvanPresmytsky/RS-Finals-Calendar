import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closePopup } from '../popups_actions';
import { deleteUser } from '../../../actions/authorization.js';

import './delete_user_popup.css';

export class DeleteUserPopup extends Component {
  constructor(props) {
    super(props);
    this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
  }

  clearForm () {
    this.password.value = '';
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onDeleteBtnClick(e) {
    e.preventDefault();
    this.props.deleteUser(this.password.value, this.props.userId);
    this.props.closeDeleteUserPopup();
    this.clearForm();
  }

  render () {
    return (
      <div className='delete-user-popup'>
        <form className="delete-user-form" onSubmit={this.onSubmit.bind(this)}>
           <p>To confirm deletion, please enter your password</p>
           <input 
             type="password" 
             className="delete-user-form__password" 
             placeholder="enter password"
             defaultValue=""
             ref={password => (this.password = password)}
           />
           <input 
             type="submit" 
             className="delete-user-form__submit" 
             value="delete user"
             ref={submit => (this.submit = submit)}
             onClick={this.onDeleteBtnClick}
           />
        </form>
      </div>
    );
  }
}

DeleteUserPopup.propTypes = {
  userId: React.PropTypes.string
}

function mapStateToProps (state) {
  return {
    userId: state.authorization.id
  };
}

function mapDispatchToprops (dispatch) {
  return {
    deleteUser: bindActionCreators(deleteUser, dispatch),
    closePopup: bindActionCreators(closePopup, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToprops)(DeleteUserPopup);
