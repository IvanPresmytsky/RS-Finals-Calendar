require('../../stylesheets/components/monthViewComponents/MonthBody.css');
var React = require('react');
var days = require('../../utils/Date.js');

var MonthBody = React.createClass({
  render: function() {
    var index = this.props.currentMonthIndex;
    var dayNumsArr = days.dayNums(index);
    var currentMonth = days.currentMonth(dayNumsArr);

    function createDayTemplate(day, index) {
      var id = day.toLocaleString().slice(0,10);
      var date = days.curentDateFormated();
      var dayClass = 'month-view__day';

      if(day.getDay() === 0 || day.getDay() === 6) {
        dayClass += ' holiday-day'
      }
      if(date === id) {
        dayClass += ' current-day'
      }
      if(day.getMonth() !== currentMonth) {
        dayClass += ' no-current-month-day'
      }

      return (
        <div key={id} className={dayClass}>
          <span>{day.getDate()}</span>
        </div>
      );
    }

    function createMonthDodyTemplate(week, index) {
      var dayTemplate = week.map(createDayTemplate);
      return (
        <div key={index} className="month-view__week">
          {dayTemplate}
        </div>
      );
    }

    var MonthBodyTemplate = dayNumsArr.map(createMonthDodyTemplate);

    return (
      <div className="month-view">
        {MonthBodyTemplate}
      </div>
    );
  }
});

MonthBody.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired
}

module.exports = MonthBody;
