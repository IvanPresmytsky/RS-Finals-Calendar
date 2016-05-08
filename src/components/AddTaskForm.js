require('../stylesheets/components/addTaskForm.css');
var React = require('react');
var ReactDOM = require('react-dom');

var AddTaskForm = React.createClass({
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.taskName).focus();
  },

  render: function () {
    return (
      <div className="add-task-popup">
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
      </div>
    );
  }
});

module.exports = AddTaskForm;
