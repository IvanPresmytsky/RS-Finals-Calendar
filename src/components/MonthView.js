require('../stylesheets/components/monthView.css');
var React = require('react');
var MonthHeader = require('./monthViewComponents/MonthHeader.js');
var MonthBody = require('./monthViewComponents/MonthBody.js');


var MonthView = React.createClass({
  render: function() {
    var currentMonthIndex = this.props.currentMonthIndex;
    return (
      <div className="month-view">
        <MonthHeader />
        <MonthBody currentMonthIndex={currentMonthIndex}/>
      </div>
    );
  }
});

MonthView.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired
}

module.exports = MonthView;
