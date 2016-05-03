var React = require('react');
var ReactDOM = require('react-dom');
require('../stylesheets/components/logInForm.css');

var LogInForm = React.createClass({
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.user).focus();
  },
  
  render: function (){
    return (
      <div className="login-popup">
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
      </div>
    );
  }
});

module.exports = LogInForm;
