var React = require('react');
require('../stylesheets/components/statePanel.css');
var currentDate = require('./Date.js');
var date = currentDate['date'];

var StatePanel = React.createClass({
  render: function () {
    return (
      <section className="state-panel">
        <button className="btn today-btn">Today</button>
        <button className="btn prev-btn"> previous </button>
        <button className="btn next-btn"> next </button>
        <span className="current-date">{date}</span>
      </section>
    );
  }
});

module.exports = StatePanel;
