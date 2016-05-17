var React = require('react');
require('../stylesheets/components/statePanel.css');

var StatePanel = React.createClass({
  onBtnChangeMonthClick: function (e) {
    var counter = this.props.currentMonthIndex;
    var btnClass = e.target.classList;

    if (btnClass.contains("next-btn")) counter++;
    if (btnClass.contains("prev-btn")) counter--;
    if (btnClass.contains("today-btn")) counter = 0;
    this.props.changeMonth(counter);
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
        <span className="current-date">{this.props.currentDate}</span>
      </section>
    );
  }
});

StatePanel.propTypes = {
  currentMonthIndex: React.PropTypes.number.isRequired,
  currentDate: React.PropTypes.string.isRequired,
  changeMonth: React.PropTypes.func.isRequired,
  addEvent: React.PropTypes.func.isRequired
}


module.exports = StatePanel;
