import classNames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeLoginForm } from '../actions/popups.js';
import { initializeEvents } from '../actions/events.js';
import { signIn } from '../actions/authorization.js';

import '../stylesheets/components/loginForm.css';

export class LoginForm extends Component {

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.user).focus();
  }

  clearForm () {
    this.refs.user.value = '';
    this.refs.password.value = '';
  }

  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.closeLoginForm();
    this.clearForm();
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.signIn(this.refs.user.value, this.refs.password.value);
    this.props.closeLoginForm();
    this.clearForm();
  }

  render () {
    let popupClass = classNames('login-popup', {
      ' popup-visible': this.props.visibility
    });

    return (
      <div className={popupClass}>
        <form className="login-form" onSubmit={this.onSubmit.bind(this)}>
           <p>User</p>
           <input 
             type="text" 
             className="login-form__user" 
             placeholder="enter user name"
             defaultValue=""
             ref="user"
           />
           <p>Password</p>
           <input 
             type="password" 
             className="login-form__password" 
             placeholder="enter password"
             defaultValue=""
             ref="password"
           />
           <input 
             type="submit" 
             className="login-form__submit" 
             value="log in"
             ref="submit"
           />
        </form>
        <div className="login-popup__close">
          <a href="#" onClick={this.onBtnCloseClick.bind(this)}>X</a>
        </div>
      </div>
    );
  }
};

LoginForm.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  closeLoginForm: React.PropTypes.func.isRequired,
  signIn: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    visibility: state.popups.loginFormVisibility
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeLoginForm: bindActionCreators(closeLoginForm, dispatch),
    signIn: bindActionCreators(signIn, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
