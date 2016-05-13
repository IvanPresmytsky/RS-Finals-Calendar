var React = require('react');
require('../stylesheets/components/statePanel.css');
var date = require('../utils/Date.js');
var counter = 0;
var visibleDate = date.actualDate();

var StatePanel = React.createClass({

  onBtnChangeMonthClick: function (e) {
    var btnClass = e.target.classList;

    if (btnClass.contains("next-btn")) counter++;
    if (btnClass.contains("prev-btn")) counter--;
    if (btnClass.contains("today-btn")) counter = 0;

    var dayNumsArr = date.dayNums(counter);

    this.props.changeMonth(counter);
    visibleDate = date.actualDate(dayNumsArr);
  },

  onBtnAddEventClick: function (e) {
    e.preventDefault();
    this.props.addEvent(true);
  },

  render: function () {
    return (
      <section className="state-panel">
        <a href="#" onClick={this.onBtnAddEventClick} className="btn add-task-btn">Add new event</a>
        <a href="#" onClick={this.onBtnChangeMonthClick} className="btn prev-btn"> prev </a>
        <a href="#" onClick={this.onBtnChangeMonthClick} className="btn today-btn">Today</a>
        <a href="#" onClick={this.onBtnChangeMonthClick} className="btn next-btn"> next </a>
        <span className="current-date">{visibleDate}</span>
      </section>
    );
  }
});

StatePanel.propTypes = {
  changeMonth: React.PropTypes.func.isRequired,
  addEvent: React.PropTypes.func.isRequired
}


module.exports = StatePanel;
