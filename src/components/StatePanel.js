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
    var currentMonth = date.currentMonth(dayNumsArr);
    var currentYear = date.currentYear(dayNumsArr);
    this.props.changeMonth(counter);
    visibleDate = date.actualDate(currentYear, currentMonth);
  },

  onBtnCurrentClick: function () {
    counter = 0;
    this.props.changeMonth(counter);
    visibleDate = date.currentDate();
  },

  render: function () {
    return (
      <section className="state-panel">
        <a href="#" className="add-task-btn">Add new event</a>
        <button onClick={this.onBtnChangeMonthClick} className="btn today-btn">Today</button>
        <button onClick={this.onBtnChangeMonthClick} className="btn prev-btn"> previous </button>
        <button onClick={this.onBtnChangeMonthClick} className="btn next-btn"> next </button>
        <span className="current-date">{visibleDate}</span>
      </section>
    );
  }
});

module.exports = StatePanel;
