require('../stylesheets/components/event.css');
var React = require('react');

var Event = React.createClass({

  render: function() {
    var title = this.props.title;
    var time = this.props.time;
    return (
      <div className="event-body">
        <span className="event-title">{title}</span>
        <span className="event-time">{time}</span>
      </div>
    );
  }
});

Event.propTypes = {
  title: React.PropTypes.string.isRequired,
  time: React.PropTypes.string.isRequired
}

module.exports = Event;
