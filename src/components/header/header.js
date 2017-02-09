import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { openLoginForm } from '../popups/login_form/login_form_actions';
import { openRegisterForm } from '../popups/register_form/register_form_actions';

import Account from './account/account.js';
import './header.css';

export class Header extends Component{
  constructor(props) {
    super(props);
    this.onBtnLogInClick = this.onBtnLogInClick.bind(this);
    this.onBtnRegisterClick = this.onBtnRegisterClick.bind(this);
  }

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

  renderMainNav() {
    if(this.props.username) {
      return <Account />;
    } else {
      return (
        <nav className="main-nav">
          <ul>
            <li>
              <a href="#" className="login-btn" onClick={this.onBtnLogInClick} >log in</a>
            </li>
            <li>
              <a href="#" className="register-btn" onClick={this.onBtnRegisterClick} >register</a>
            </li>
          </ul>
        </nav>
      );
    }
  }

  render () {
    let mainNav = this.renderMainNav();
    return (
       <header className="main-header">
         <h1 className="main-title">
           <Link to="/" className="main-title__home">Calendar</Link>
         </h1>
         {mainNav}
       </header>
    );
  }
};

Header.propTypes = {
  username: React.PropTypes.string,
  openLoginForm: React.PropTypes.func.isRequired,
  openRegisterForm: React.PropTypes.func.isRequired,
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

