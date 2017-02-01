import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closePopup } from '../popups_actions';
import { openMessagePopup } from '../message_popup/message_popup_actions';
import { signIn, signUp, signOut } from '../../../actions/authorization';
import './register_form.css';

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.user).focus();
  }

  clearForm () {
    this.user.value = '';
    this.password.value = '';
    this.confirmedPassword.value = '';
  }

  onSubmitForm(e) {
    e.preventDefault();
  }

  onRegisterClick(e) {
    let password = this.password.value;
    let username = this.user.value;
    let confirmedPassword = this.confirmedPassword.value;

    if (password === confirmedPassword) {
      this.props.signUp(username, password);
      this.props.closePopup();
    } else {
      this.props.openMessagePopup({ message:'Password and confirmPassword fields should be equal' });
    }
    this.clearForm();
  }

  render () {
    return (
      <div className="register-popup">
        <form className="register-form" onSubmit={this.onSubmitForm}>
           <p>User</p>
           <input 
             type="text" 
             className="register-form__user" 
             placeholder="enter user name"
             defaultValue=""
             ref={user => (this.user = user)}
           />
           <p>Password</p>
           <input 
             type="password" 
             className="register-form__password" 
             placeholder="enter password"
             defaultValue=""
             ref={password => (this.password = password)}
           />
           <p>Confirm password</p>
           <input 
             type="password"
             className="register-form__confirm-password" 
             placeholder="confirm password"
             defaultValue=""
             ref={confirmedPassword => (this.confirmedPassword = password)}
           />
           <input
             type="submit" 
             className="register-form__submit" 
             value="register"
             ref={submit => (this.submit = submit)}
             onClick={this.onRegisterClick}
           />
        </form>
      </div>
    );
  }
};

RegisterForm.propTypes = {
  userId: React.PropTypes.string,
  closePopup: React.PropTypes.func.isRequired,
  openMessagePopup: React.PropTypes.func.isRequired,
  signIn: React.PropTypes.func.isRequired,
  signUp: React.PropTypes.func.isRequired,
  signOut: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    userId: state.authorization.id
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closePopup: bindActionCreators(closePopup, dispatch),
    openMessagePopup: bindActionCreators(openMessagePopup, dispatch),
    signIn: bindActionCreators(signIn, dispatch),
    signUp: bindActionCreators(signUp, dispatch),
    signOut: bindActionCreators(signOut, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
