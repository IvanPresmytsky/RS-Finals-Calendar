require('../stylesheets/components/addEvent.css');
var React = require('react');
var ReactDOM = require('react-dom');
var styleConstants = require('../constants/styleConstans.js');

var AddEvent = React.createClass({
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.eventName).focus();
  },

  onBtnCloseClick: function (e) {
    e.preventDefault();
    this.props.addEvent(false);
  },

  onSubmit: function (e) {
    e.preventDefault();
    var event = {
      title: this.refs.eventName.value.trim(),
      text: this.refs.eventDescription.value.trim(),
      date: this.refs.eventDate.value || this.props.defaultDate,
      startTime: this.refs.eventStartTime.value,
      endTime: this.refs.eventEndTime.value
    };

    this.props.createEvent(event);
    this.props.addEvent(false);
    this.refs.eventDate.value = null;
  },

  render: function () {
    var visible = this.props.visibility;
    var position = this.props.position;
    var defaultDate = this.props.defaultDate;
    var top = position ? position.top : 0;
    var left = position ? position.left : 0;
    var style = {
      position: 'absolute',
      top: top,
      left: left,
      width: styleConstants.ADD_EVENT_WIDTH,
      height: styleConstants.ADD_EVENT_HEIGHT
    };
    var popupClass = "add-event-popup";
    var dateInputClass = "add-event-form__event-date";
    var required = defaultDate ? '' : 'required';

    if (visible) popupClass += " popup-visible";
    if (defaultDate) dateInputClass += " input-hidden";

    return (
      <div className={popupClass} style={style}>
        <form className="add-event-form" onSubmit={this.onSubmit} >
          <p>event title</p>
          <input
          type="text"
            className="add-event-form__event-name"
            placeholder="enter task name"
            defaultValue=""
            ref="eventName"
            required
          />
          <p>event description</p>
          <input
            type="textarea"
            className="add-event-form__event-description"
            placeholder="enter task description"
            defaultValue=""
            ref="eventDescription"
          />
          <p className={dateInputClass}>event date</p>
          <input
            type="date"
            className={dateInputClass}
            ref="eventDate"
            required = {required}
          />
          <p>from</p>
          <input
            type="time"
            className="add-event-form__event-start-time"
            defaultValue=""
            ref="eventStartTime"
            required
          />
          <p>to</p>
          <input
            type="time"
            className="add-event-form__event-end-time"
            defaultValue=""
            ref="eventEndTime"
          />
          <input
            type="submit"
            className="add-event-form__submit"
            value="add task"
            ref="submit"
          />
        </form>
        <div className="add-event-popup__close">
         <a href="#" onClick={this.onBtnCloseClick}>X</a>
        </div>
      </div>
    );
  }
});

AddEvent.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  addEvent: React.PropTypes.func.isRequired,
  createEvent: React.PropTypes.func.isRequired
}

module.exports = AddEvent;
