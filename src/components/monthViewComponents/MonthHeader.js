require('../../stylesheets/components/monthViewComponents/MonthHeader.css');
var React = require('react');
var days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];


var MonthHeader = React.createClass({
  render: function() {

    function createMonthHeaderTemplate(day) {
      return (
        <div key={day} className="month-header__day-name">
          <span>{day}</span>
        </div>
      );
    }

    var monthHeaderTemplate = days.map(createMonthHeaderTemplate);

    return (
      <div className="month-header">
        {monthHeaderTemplate}
      </div>
    );
  }
});

module.exports = MonthHeader;
