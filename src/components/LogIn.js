var React = require('react');
var ReactDOM = require('react-dom');
require('../stylesheets/components/logIn.css');

var LogIn = React.createClass({
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.user).focus();
  },

  onBtnCloseClick: function (e) {
    e.preventDefault();
    this.props.logIn(false);
  },

  render: function (){
    var visible = this.props.visibility;
    var popupClass = "login-popup"
    if (visible) popupClass += " popup-visible";
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
          <a href="#" onClick={this.onBtnCloseClick}>X</a>
        </div>
      </div>
    );
  }
});

LogIn.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  logIn: React.PropTypes.func.isRequired
}

module.exports = LogIn;
