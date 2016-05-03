var React = require('react');
var ToolBar = require('./ToolBar.js');
var StatePanel = require('./StatePanel.js');
var Month = require('./Month.js');
var LogInForm = require('./LogInForm.js');
var Header = require('./Header.js');
var RegisterForm = require('./RegisterForm.js');
var AddTaskForm = require('./AddTaskForm.js');

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
         <Header />
         <StatePanel />
         <ToolBar />
         <Month />
         <LogInForm />
         <RegisterForm />
         <AddTaskForm />
      </div>
    );
  }
});

module.exports = App;
