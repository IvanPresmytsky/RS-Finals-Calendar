var appCss = require('./stylesheets/application.css');
var App = require('./components/Application.js');

var React = require('react');
var ReactDOM = require('react-dom');
/*
var ToolBar = React.createClass({
  render: function
});
*/

ReactDOM.render(
  <App />,
  document.getElementsByClassName('root')[0]
);

