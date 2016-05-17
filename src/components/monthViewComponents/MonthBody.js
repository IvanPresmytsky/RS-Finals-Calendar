require('../../stylesheets/components/monthViewComponents/monthBody.css');
var React = require('react');
var date = require('../../utils/Date.js');
var position = require('../../utils/position.js');
var Day = require('./Day.js');
var Week = require('./Week.js');

var MonthBody = React.createClass({

  onEventMouseDown: function(e) {
     if (!e.target.classList.contains('event-body')) return;

     var eventBlock = e.target;
     console.log(e.pageX);
     console.log(e.pageY);
     console.log(e.target.offsetWidth);
     eventBlock.style.position = 'absolute';

     position.moveAt(e)

     return false;
  },

  onEventMouseMove: function(e) {
    position.moveAt(e);
  },

  onEventDragStart: function(e) {
    return false;
  },

  onSelectStart: function() {
    return false;
  },

  onEventMouseUp: function(e) {
    if (!e.target.classList.contains('event-body')) return;

    e.target.style.display = 'none';
    var el = document.elementFromPoint(e.pageX, e.pageY);
    if (el.classList.contains('month-view__day')) {
      el.appendChild(e.target);
    }
    e.target.style.display = '';
    e.target.style.position = 'static';
    return false;
  },

  onDaytClick: function (e) {
    if (!e.target.classList.contains('month-view__day')) return;

    var monthIndex = this.props.currentMonthIndex;
    if (e.target.classList.contains('prev-month-day')) {
      this.props.changeMonth(--monthIndex);
      return;
    }
    if (e.target.classList.contains('next-month-day')) {
      this.props.changeMonth(++monthIndex);
      return;
    }

    e.preventDefault();
    var dayPosition = e.target.getBoundingClientRect();
    var addEventPosition = position.countAddEventPosition(dayPosition);
    var defaultDate = e.target.id;
    //console.log(defaultDate);
    this.props.addEvent(true, addEventPosition, defaultDate);
  },

  render: function() {
    console.log(this.props.events);
    var events = this.props.events;
    var index = this.props.currentMonthIndex;
    var addEvent = this.props.addEvent;
    var changeMonth = this.props.changeMonth;
    var dayNumsArr = date.dayNums(index);
    var currentMonth = dayNumsArr[Math.round(dayNumsArr.length/2)].getMonth();
    dayNumsArr = date.splitDaysToWeeks(dayNumsArr);

    function defineDayEvents (id) {
      return events.filter(function(event) {
        return event.date === id;
      });
    }

    function createDayTemplate(day) {
      var id = day.toLocaleString().slice(0,10).replace(/\./g, '-').split('-').reverse().join('-');
      var currentDate = date.curentDateFormated();
      var dayEvents = defineDayEvents(id);
      //console.log(id);
      //console.log(dayEvents);
      return (
        <Day key={id} id={id} day={day} currentDate={currentDate} currentMonth={currentMonth} events={dayEvents} addEvent={addEvent} changeMonth={changeMonth}/>
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
      <div onClick={this.onDaytClick} onMouseDown={this.onEventMouseDown} onMouseMove={this.onEventMouseMove} onMouseUp={this.onEventMouseUp} onDragStart={this.onEventDragStart} onSelectStart={this.onSelectStart} className="month-body">
        {MonthBodyTemplate}
      </div>
    );
  }
});

MonthBody.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired,
  events: React.PropTypes.array.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  changeMonth: React.PropTypes.func.isRequired
}

module.exports = MonthBody;


