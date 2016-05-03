require('../stylesheets/components/registerForm.css');
var React = require('react');
var ReactDOM = require('react-dom');

var RegisterForm = React.createClass({
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.user).focus();
  },

  render: function () {
    return (
      <div className="register-popup">
        <form className="register-form">
           <p>User</p>
           <input 
             type="text" 
             className="register-form__user" 
             placeholder="enter user name"
             defaultValue=""
             ref="user"
           />
           <p>Password</p>
           <input 
             type="password" 
             className="register-form__password" 
             placeholder="enter password"
             defaultValue=""
             ref="password"
           />
           <p>Confirm password</p>
           <input 
             type="password"
             className="register-form__confirm-password" 
             placeholder="confirm password"
             defaultValue=""
             ref="password"
           />
           <input
             type="submit" 
             className="register-form__submit" 
             value="register"
             ref="submit"
           />
        </form>
      </div>
    );
  }
});

module.exports = RegisterForm;
