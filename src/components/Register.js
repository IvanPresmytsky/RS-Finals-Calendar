require('../stylesheets/components/register.css');
var React = require('react');
var ReactDOM = require('react-dom');

var Register = React.createClass({
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.user).focus();
  },

  onBtnCloseClick: function (e) {
    e.preventDefault();
    this.props.register(false);
  },

  render: function () {
    var visible = this.props.visibility;
    var popupClass = "register-popup"
    if (visible) popupClass += " popup-visible";
    return (
      <div className={popupClass}>
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
        <div className="register-popup__close">
         <a href="#" onClick={this.onBtnCloseClick}>X</a>
        </div>
      </div>
    );
  }
});

Register.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  register: React.PropTypes.func.isRequired
}

module.exports = Register;
