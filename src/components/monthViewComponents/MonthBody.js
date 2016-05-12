require('../../stylesheets/components/monthViewComponents/monthBody.css');
var React = require('react');
var date = require('../../utils/Date.js');
var Day = require('./Day.js');
var Week = require('./Week.js');

var MonthBody = React.createClass({
  render: function() {
    var index = this.props.currentMonthIndex;
    var dayNumsArr = date.dayNums(index);
    var currentMonth = dayNumsArr[Math.round(dayNumsArr.length/2)].getMonth();
    dayNumsArr = date.splitDaysToWeeks(dayNumsArr);

    function createDayTemplate(day) {
      var id = day.toLocaleString().slice(0,10);
      var currentDate = date.curentDateFormated();

      return (
        <Day key={id} id={id} day={day} currentDate={currentDate} currentMonth={currentMonth} />
      );
    }

    function createMonthBodyTemplate(week, index) {
      var daysTemplate = week.map(createDayTemplate);
      return (
        <Week key={index} daysTemplate={daysTemplate} />
      );
    }

    var MonthBodyTemplate = dayNumsArr.map(createMonthBodyTemplate);

    return (
      <div className="month-body">
        {MonthBodyTemplate}
      </div>
    );
  }
});

MonthBody.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired
}

module.exports = MonthBody;
