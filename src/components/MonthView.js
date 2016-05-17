require('../stylesheets/components/monthView.css');
var React = require('react');
var MonthHeader = require('./monthViewComponents/MonthHeader.js');
var MonthBody = require('./monthViewComponents/MonthBody.js');


var MonthView = React.createClass({
  render: function() {
    var currentMonthIndex = this.props.currentMonthIndex;
    var addEvent = this.props.addEvent;
    var changeEvent = this.props.changeEvent;
    var changeMonth = this.props.changeMonth;
    var events = this.props.events;
    return (
      <div className="month-view">
        <MonthHeader />
        <MonthBody addEvent={addEvent} changeEvent={changeEvent} changeMonth={changeMonth} currentMonthIndex={currentMonthIndex} events={events} />
      </div>
    );
  }
});

MonthView.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired,
  events: React.PropTypes.array.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  changeEvent: React.PropTypes.func.isRequired,
  changeMonth: React.PropTypes.func.isRequired
}

module.exports = MonthView;
