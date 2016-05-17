require('../../stylesheets/components/monthViewComponents/monthDay.css');
var React = require('react');
var Event = require('../Event.js');
var date = require('../../utils/Date.js');

var Day = React.createClass({
  render: function() {
    var day = this.props.day;
    var id = this.props.id;
    var currentDate = this.props.currentDate.replace(/\./g, '-').split('-').reverse().join('-');
    var currentMonth = this.props.currentMonth;
    var events = this.props.events;
    var dayClass = 'month-view__day';
    

    function createEventsTemplate (event, index) {
      var eventKey = date.originalKey();
      var title = event.title;
      var time = event.startTime;
      return (
        <Event key={eventKey + index} title={title} time={time} />
      );
    }

    var eventsTemplate = events.map(createEventsTemplate);

    if(day.getDay() === 0 || day.getDay() === 6) {
      dayClass += ' holiday-day';
    }
    if(currentDate === id) {
      dayClass += ' current-day';
    }
    if(day.getMonth() < currentMonth) {
      dayClass += ' prev-month-day';
    }
    if(day.getMonth() > currentMonth) {
      dayClass += ' next-month-day';
    }

    return (
      <div id={id} className={dayClass}>
        <span className="day__day-number">{day.getDate()}</span>
        {eventsTemplate}
      </div>
    );
  }
});

Day.propTypes = {
  day: React.PropTypes.object.isRequired,
  id: React.PropTypes.string.isRequired,
  currentDate: React.PropTypes.string.isRequired,
  currentMonth: React.PropTypes.number.isRequired,
  events: React.PropTypes.array.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  changeMonth: React.PropTypes.func.isRequired
}

module.exports = Day;
