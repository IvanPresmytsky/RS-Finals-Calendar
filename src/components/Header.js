import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openLoginForm, openRegisterForm, openUserMenu } from '../actions/popups.js';
import UserMenu from './UserMenu.js';
import '../stylesheets/components/header.css';

export class Header extends Component{
  onBtnLogInClick (e) {
    e.preventDefault();
    if (!this.props.username) {
      this.props.openLoginForm();
    } else {
      this.props.openUserMenu();
    }
    
  }

  onBtnRegisterClick (e) {
    e.preventDefault();
    this.props.openRegisterForm();
  }

  render () {
    let loginText = this.props.username || 'log in';
    return (
       <header className="main-header">
         <h1 className="main-title">Calendar</h1>
         <nav className="main-nav">
           <ul>
            <li>
              <a href="#" className="login-btn" onClick={this.onBtnLogInClick.bind(this)} >{loginText}</a>
            </li>
            <li>
              <a href="#" className="register-btn" onClick={this.onBtnRegisterClick.bind(this)} >register</a>
            </li>
           </ul>
           <UserMenu />
         </nav>
       </header>
    );
  }
};

Header.propTypes = {
  username: React.PropTypes.string,
  openLoginForm: React.PropTypes.func.isRequired,
  openRegisterForm: React.PropTypes.func.isRequired,
  openUserMenu: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    username: state.authorization.username
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openLoginForm: bindActionCreators(openLoginForm, dispatch),
    openRegisterForm: bindActionCreators(openRegisterForm, dispatch),
    openUserMenu: bindActionCreators(openUserMenu, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

