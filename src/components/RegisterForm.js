import classNames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeRegisterForm, openMessagePopup } from '../actions/popups.js';
import { signIn, signUp, signOut } from '../actions/authorization.js'
import '../stylesheets/components/registerForm.css';

export class RegisterForm extends Component {
  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.user).focus();
  }

  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.closeRegisterForm();
  }

  onSubmit(e) {
    e.preventDefault();
    let password = this.refs.password.value;
    let username = this.refs.user.value;
    let confirmedPassword = this.refs.confirmedPassword.value;

    if (password === confirmedPassword) {
      this.props.signUp(username, password);
      this.props.closeRegisterForm();
    } else {
      this.props.openMessagePopup('Password and confirmPassword fields should be equal');
    }
  }

  render () {
    let popupClass = classNames('register-popup', {
      ' popup-visible': this.props.visibility
    });

    return (
      <div className={popupClass}>
        <form className="register-form" onSubmit={this.onSubmit.bind(this)}>
           <p>User</p>
           <input 
             type="text" 
             className="register-form__user" 
             placeholder="enter user name"
             defaultValue=""
             ref="user"
           />
           <p>Password</p>
           <input 
             type="password" 
             className="register-form__password" 
             placeholder="enter password"
             defaultValue=""
             ref="password"
           />
           <p>Confirm password</p>
           <input 
             type="password"
             className="register-form__confirm-password" 
             placeholder="confirm password"
             defaultValue=""
             ref="confirmedPassword"
           />
           <input
             type="submit" 
             className="register-form__submit" 
             value="register"
             ref="submit"
           />
        </form>
        <div className="register-popup__close">
          <a href="#" onClick={this.onBtnCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
};

RegisterForm.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  userId: React.PropTypes.string,
  closeRegisterForm: React.PropTypes.func.isRequired,
  openMessagePopup: React.PropTypes.func.isRequired,
  signIn: React.PropTypes.func.isRequired,
  signUp: React.PropTypes.func.isRequired,
  signOut: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    visibility: state.popups.registerFormVisibility,
    userId: state.authorization.id
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeRegisterForm: bindActionCreators(closeRegisterForm, dispatch),
    openMessagePopup: bindActionCreators(openMessagePopup, dispatch),
    signIn: bindActionCreators(signIn, dispatch),
    signUp: bindActionCreators(signUp, dispatch),
    signOut: bindActionCreators(signOut, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
