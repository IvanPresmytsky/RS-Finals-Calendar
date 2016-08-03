import classNames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeRegisterForm } from '../actions/popups.js';
import { signIn, signUp } from '../actions/authorization.js'
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
    let signUpData = {
      username: this.refs.user.value,
      password: this.refs.password.value,
      confirmedPassword: this.refs.confirmedPassword.value
    }
    this.props.signUp(signUpData);
    this.props.closeRegisterForm();
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
  closeRegisterForm: React.PropTypes.func.isRequired,
  signIn: React.PropTypes.func.isRequired,
  signUp: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    visibility: state.popups.registerFormVisibility
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeRegisterForm: bindActionCreators(closeRegisterForm, dispatch),
    signIn: bindActionCreators(signIn, dispatch),
    signUp: bindActionCreators(signUp, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
