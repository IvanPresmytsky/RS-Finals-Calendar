require('../stylesheets/components/addEvent.css');
var React = require('react');
var ReactDOM = require('react-dom');
var styleConstants = require('../constants/styleConstans.js');

var AddEvent = React.createClass({
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.taskName).focus();
  },

  onBtnCloseClick: function (e) {
    e.preventDefault();
    this.props.addEvent(false);
  },

  render: function () {

    var visible = this.props.visibility;
    var position = this.props.position;
    var top = position ? position.top : 0;
    var left = position ? position.left : 0;
    var style = {
      position: 'absolute',
      top: top,
      left: left,
      width: styleConstants.ADD_EVENT_WIDTH,
      height: styleConstants.ADD_EVENT_HEIGHT
    };
   var popupClass = "add-task-popup"
    if (visible) popupClass += " popup-visible";
    
    return (
      <div className={popupClass} style={style}>
        <form className="add-task-form">
          <p>task title</p>
          <input
          type="text"
            className="add-task-form__task-name"
            placeholder="enter task name"
            defaultValue=""
            ref="taskName"
          />
          <p>task description</p>
          <input
            type="textarea"
            className="add-task-form__task-description"
            placeholder="enter task description"
            defaultValue=""
            ref="taskDescription"
          />
          <p>task date</p>
          <input
            type="date"
            className="add-task-form__task-date"
            defaultValue=""
            ref="taskDate"
          />
          <p>from</p>
          <input
            type="time"
            className="add-task-form__task-start-time"
            defaultValue=""
            ref="taskStartTime"
          />
          <p>to</p>
          <input
            type="time"
            className="add-task-form__task-end-time"
            defaultValue=""
            ref="taskEndTime"
          />
          <input
            type="submit"
            className="add-task-form__submit"
            value="add task"
            ref="submit"
          />
        </form>
        <div className="add-task-popup__close">
         <a href="#" onClick={this.onBtnCloseClick}>X</a>
        </div>
      </div>
    );
  }
});

AddEvent.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  addEvent: React.PropTypes.func.isRequired
}

module.exports = AddEvent;
