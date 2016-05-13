require('../stylesheets/components/monthView.css');
var React = require('react');
var MonthHeader = require('./monthViewComponents/MonthHeader.js');
var MonthBody = require('./monthViewComponents/MonthBody.js');


var MonthView = React.createClass({
  render: function() {
    var currentMonthIndex = this.props.currentMonthIndex;
    var addEvent = this.props.addEvent;
    return (
      <div className="month-view">
        <MonthHeader />
        <MonthBody addEvent={addEvent} currentMonthIndex={currentMonthIndex}/>
      </div>
    );
  }
});

MonthView.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired,
  addEvent: React.PropTypes.func.isRequired
}

module.exports = MonthView;
