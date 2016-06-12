import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openLoginForm, openRegisterForm } from '../actions/popups.js';

import '../stylesheets/components/header.css';

export class Header extends Component{
  onBtnLogInClick (e) {
    e.preventDefault();
    this.props.openLoginForm();
  }

  onBtnRegisterClick (e) {
    e.preventDefault();
    this.props.openRegisterForm();
  }

  render () {
    console.log(this.props);
    return (
       <header className="main-header">
         <h1 className="main-title">Calendar</h1>
         <nav className="main-nav">
           <ul>
            <li>
              <a href="#" className="login-btn" onClick={this.onBtnLogInClick.bind(this)} >log in</a>
            </li>
            <li>
              <a href="#" className="register-btn" onClick={this.onBtnRegisterClick.bind(this)} >register</a>
            </li>
           </ul>
         </nav>
       </header>
    );
  }
};

Header.propTypes = {
  openLoginForm: React.PropTypes.func.isRequired,
  openRegisterForm: React.PropTypes.func.isRequired
}

function mapDispatchToProps (dispatch) {
  return {
    openLoginForm: bindActionCreators(openLoginForm, dispatch),
    openRegisterForm: bindActionCreators(openRegisterForm, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Header);

