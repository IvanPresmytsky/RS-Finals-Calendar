var React = require('react');
var ReactRedux = require('react-redux');
var Redux = require('redux');

var ToolBar = require('./ToolBar.js');
var StatePanel = require('./StatePanel.js');
var MonthView = require('./MonthView.js');
var LogIn = require('./LogIn.js');
var Header = require('./Header.js');
var Register = require('./Register.js');
var AddEvent = require('./AddEvent.js');

var setMonth = require('../actions/setMonth.js');
var addEvent = require('../actions/addEvent.js');
var logIn = require('../actions/logIn.js');
var register = require('../actions/register.js'); 
var eventAdded = require('../actions/eventAdded.js');

var position = require('../utils/position.js');

var App = React.createClass({
  render: function () {
    console.log(this.props);
    var setMonth = this.props.setMonth;
    var addEvent = this.props.addEvent;
    var createEvent = this.props.eventAdded;
    var logIn = this.props.logIn;
    var register = this.props.register;
    var currentMonthIndex = this.props.monthIndex;
    var currentDate = this.props.currentDate;
    var events = this.props.events;
    var addEventVisibility = this.props.addEventVisibility;
    var addEventPosition = this.props.addEventPosition;
    var addEventDefaultDate = this.props.addEventDefaultDate;
    var logInVisibility = this.props.logInVisibility;
    var registerVisibility = this.props.registerVisibility;

    return (
      <div className="container">
         <div className="wrapper">
           <Header logIn={logIn} register={register} />
           <StatePanel changeMonth={setMonth} addEvent={addEvent} currentMonthIndex={currentMonthIndex} currentDate={currentDate}/>
         </div>
         <MonthView addEvent={addEvent} changeEvent={createEvent} changeMonth={setMonth} currentMonthIndex={currentMonthIndex} events={events}/>
         <LogIn logIn={logIn} visibility={logInVisibility} />
         <Register register={register} visibility={registerVisibility} />
         <AddEvent visibility={addEventVisibility} position={addEventPosition} defaultDate={addEventDefaultDate} addEvent={addEvent} createEvent={createEvent}/>
      </div>
    );
  }
});

function mapStateToProps (state) {
  return {
    monthIndex: state.monthBody.monthIndex,
    currentDate: state.monthBody.date,
    addEventVisibility: state.addEvent.visibility,
    addEventPosition: state.addEvent.position,
    addEventDefaultDate: state.addEvent.defaultDate,
    events: state.eventAdded.events,
    logInVisibility: state.logIn.visibility,
    registerVisibility: state.register.visibility
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setMonth: Redux.bindActionCreators(setMonth, dispatch),
    addEvent: Redux.bindActionCreators(addEvent, dispatch),
    logIn: Redux.bindActionCreators(logIn, dispatch),
    register: Redux.bindActionCreators(register, dispatch),
    eventAdded: Redux.bindActionCreators(eventAdded, dispatch)
  };
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
