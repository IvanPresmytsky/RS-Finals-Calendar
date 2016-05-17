require('../stylesheets/components/event.css');
var React = require('react');

var Event = React.createClass({

  render: function() {
    var event = this.props.event;
    //var id = event.title + event.date + event.startTime;
    var id = event.id;
    var title = event.title;
    var time = event.time;
    return (
      <div id={id} className="event-body">
        <span className="event-title">{title}</span>
        <span className="event-time">{time}</span>
      </div>
    );
  }
});

Event.propTypes = {
  event: React.PropTypes.object.isRequired
}

module.exports = Event;
