require('../stylesheets/components/header.css');
var React = require('react');

var Header = React.createClass({
  onBtnLogInClick: function (e) {
    e.preventDefault();
    this.props.logIn(true);
  },

  onBtnRegisterClick: function (e) {
    e.preventDefault();
    this.props.register(true);
  },

  render: function(){
    return (
       <header className="main-header">
         <h1 className="main-title">Calendar</h1>
         <nav className="main-nav">
           <ul>
            <li>
              <a href="#" onClick={this.onBtnLogInClick} className="login-btn">log in</a>
            </li>
            <li>
              <a href="#" onClick={this.onBtnRegisterClick} className="register-btn">register</a>
            </li>
           </ul>
         </nav>
       </header>
    );
  }
});

Header.propTypes = {
  logIn: React.PropTypes.func.isRequired,
  register: React.PropTypes.func.isRequired
}

module.exports = Header;
