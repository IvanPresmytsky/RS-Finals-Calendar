var React = require('react');
var ReactRedux = require('react-redux');
var Redux = require('redux');
var ToolBar = require('./ToolBar.js');
var StatePanel = require('./StatePanel.js');
var MonthView = require('./MonthView.js');
var LogInForm = require('./LogInForm.js');
var Header = require('./Header.js');
var RegisterForm = require('./RegisterForm.js');
var AddTaskForm = require('./AddTaskForm.js');
var setMonth = require('../actions/setMonth.js');

var App = React.createClass({
  render: function () {
    console.log(this.props);
    var setMonth = this.props.setMonth;
    var currentMonthIndex = this.props.monthIndex;
    return (
      <div className="container">
         <Header />
         <StatePanel changeMonth={setMonth}/>
         <MonthView currentMonthIndex={currentMonthIndex}/>
         <LogInForm />
         <RegisterForm />
         <AddTaskForm />
      </div>
    );
  }
});

function mapStateToProps (state) {
  return {
    monthIndex: state.index
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setMonth: Redux.bindActionCreators(setMonth, dispatch),
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
