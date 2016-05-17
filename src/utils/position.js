var styleConstants = require('../constants/styleConstans.js');

function countAddEventPosition (dayPosition) {
  var windowWidth = document.body.clientWidth;
  var windowHeight = document.body.clientHeight;
  var overWidth = windowWidth - dayPosition.left - styleConstants.ADD_EVENT_WIDTH;
  var overHeight = windowHeight - dayPosition.top - styleConstants.ADD_EVENT_HEIGHT;
  var actualLeft = (overWidth < 0) ? (dayPosition.left + overWidth) : dayPosition.left;
  var actualTop = (overHeight < 0) ? (dayPosition.top + overHeight) : dayPosition.top;

  return {
    top: actualTop,
    left: actualLeft
  };
}

function moveAt (e) {
    var eventBlock = e.target;
    eventBlock.style.top = e.pageY - (eventBlock.offsetHeight/2) + 'px';
    eventBlock.style.left = e.pageX - (eventBlock.offsetWidth/2) + 'px';
}

module.exports = {
  countAddEventPosition: countAddEventPosition,
  moveAt: moveAt
}
