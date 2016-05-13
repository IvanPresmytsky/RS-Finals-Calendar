require('../../stylesheets/components/monthViewComponents/monthHeader.css');
var React = require('react');
var days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];


var MonthHeader = React.createClass({
  render: function() {

    function createMonthHeaderTemplate(day, index) {
      var dayClass = "month-header__day-name";
      if (index > 4) dayClass += " day-name-holiday";
      return (
        <div key={day} className={dayClass}>
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
