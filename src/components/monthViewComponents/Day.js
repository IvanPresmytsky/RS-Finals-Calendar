require('../../stylesheets/components/monthViewComponents/monthDay.css');
var React = require('react');

var Day = React.createClass({

  render: function() {
    var day = this.props.day;
    var id = this.props.id;
    var currentDate = this.props.currentDate;
    var currentMonth = this.props.currentMonth;
    var dayClass = 'month-view__day';

    if(day.getDay() === 0 || day.getDay() === 6) {
      dayClass += ' holiday-day';
    }
    if(currentDate === id) {
      dayClass += ' current-day';
    }
    if(day.getMonth() !== currentMonth) {
      dayClass += ' no-current-month-day';
    }

    return (
      <div className={dayClass}>
        <span>{day.getDate()}</span>
      </div>
    );
  }
});

Day.propTypes = {
  day: React.PropTypes.object.isRequired,
  id: React.PropTypes.string.isRequired,
  currentDate: React.PropTypes.string.isRequired,
  currentMonth: React.PropTypes.number.isRequired,
  addEvent: React.PropTypes.func.isRequired
}

module.exports = Day;
