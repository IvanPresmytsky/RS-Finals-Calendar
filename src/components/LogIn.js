import '../stylesheets/components/logIn.css';

import classNames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logInClose } from '../actions/logIn.js';

export class LogIn extends Component {
  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.user).focus();
  }

  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.logInClose();
  }

  render () {
    let popupClass = classNames('login-popup', {
      ' popup-visible': this.props.visibility
    });

    return (
      <div className={popupClass}>
        <form className="login-form">
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

LogIn.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  logInClose: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    visibility: state.logIn.visibility
  };
}

function mapDispatchToProps (dispatch) {
  return {
    logInClose: bindActionCreators(logInClose, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
