require('../../stylesheets/components/monthViewComponents/monthBody.css');
var React = require('react');
var date = require('../../utils/Date.js');
var position = require('../../utils/position.js');
var Day = require('./Day.js');
var Week = require('./Week.js');

var MonthBody = React.createClass({

  onDaytClick: function (e) {
    if (!e.target.classList.contains('month-view__day')) return;
    e.preventDefault();
    var dayPosition = e.target.getBoundingClientRect();
    var addEventposition = position(dayPosition);

    this.props.addEvent(true, addEventposition);
  },

  render: function() {
    var index = this.props.currentMonthIndex;
    var addEvent = this.props.addEvent;
    var dayNumsArr = date.dayNums(index);
    var currentMonth = dayNumsArr[Math.round(dayNumsArr.length/2)].getMonth();
    dayNumsArr = date.splitDaysToWeeks(dayNumsArr);

    function createDayTemplate(day) {
      var id = day.toLocaleString().slice(0,10);
      var currentDate = date.curentDateFormated();

      return (
        <Day key={id} id={id} day={day} currentDate={currentDate} currentMonth={currentMonth} addEvent={addEvent} />
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
      <div onClick={this.onDaytClick} className="month-body">
        {MonthBodyTemplate}
      </div>
    );
  }
});

MonthBody.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired,
  addEvent: React.PropTypes.func.isRequired
}

module.exports = MonthBody;
