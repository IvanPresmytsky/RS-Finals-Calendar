import React, { Component } from 'react';

import '../stylesheets/components/header.css';

export class Header extends Component{
  onBtnLogInClick (e) {
    e.preventDefault();
    this.props.logInOpen();
  }

  onBtnRegisterClick (e) {
    e.preventDefault();
    this.props.registerOpen();
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
  logInOpen: React.PropTypes.func.isRequired,
  registerOpen: React.PropTypes.func.isRequired
}

export default Header;

