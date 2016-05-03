require('../stylesheets/components/header.css');
var React = require('react');

var Header = React.createClass({
  render: function(){
    return (
       <header className="main-header">
         <h1 className="main-title">Calendar</h1>
         <nav className="main-nav">
           <ul>
            <li>
              <a href="#" className="login-btn">log in</a>
            </li>
            <li>
              <a href="#" className="register-btn">register</a>
            </li>
           </ul>
         </nav>
       </header>
    );
  }
});

module.exports = Header;
