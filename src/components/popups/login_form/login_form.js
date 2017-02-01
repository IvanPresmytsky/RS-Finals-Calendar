import classNames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closePopup } from '../popups_actions';
import { initializeEvents } from '../../../actions/events';
import { signIn } from '../../../actions/authorization.js';

import './login_form.css';


export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.user).focus();
  }

  clearForm () {
    this.user.value = '';
    this.password.value = '';
  }

  onSubmitForm(e) {
    e.preventDefault();
  }

  onLoginClick(e) {
    e.preventDefault();
    this.props.signIn(this.user.value, this.password.value);
    this.props.closePopup();
    this.clearForm();
  }

  render () {
    return (
      <div className="login-popup">
        <form className="login-form" onSubmit={this.onSubmitForm}>
           <p>User</p>
           <input 
             type="text" 
             className="login-form__user" 
             placeholder="enter user name"
             defaultValue=""
             ref={user => (this.user = user)}
           />
           <p>Password</p>
           <input 
             type="password" 
             className="login-form__password" 
             placeholder="enter password"
             defaultValue=""
             ref={password => (this.password = password)}
           />
           <input 
             type="submit" 
             className="login-form__submit" 
             value="log in"
             ref={submit => (this.submit = submit)}
             onClick={this.onLoginClick}
           />
        </form>
      </div>
    );
  }
};

LoginForm.propTypes = {
  closePopup: React.PropTypes.func.isRequired,
  signIn: React.PropTypes.func.isRequired
}

function mapDispatchToProps (dispatch) {
  return {
    closePopup: bindActionCreators(closePopup, dispatch),
    signIn: bindActionCreators(signIn, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LoginForm);
