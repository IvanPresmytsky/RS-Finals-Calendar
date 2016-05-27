import { ADD_EVENT_WIDTH, ADD_EVENT_HEIGHT } from '../constants/handlersConstants.js';

export function countAddEventPosition (dayPosition) {
  let windowWidth = document.body.clientWidth;
  let windowHeight = document.body.clientHeight;
  let overWidth = windowWidth - dayPosition.left - ADD_EVENT_WIDTH;
  let overHeight = windowHeight - dayPosition.top - ADD_EVENT_HEIGHT;
  let actualLeft = (overWidth < 0) ? (dayPosition.left + overWidth) : dayPosition.left;
  let actualTop = (overHeight < 0) ? (dayPosition.top + overHeight) : dayPosition.top;

  return {
    top: actualTop,
    left: actualLeft
  };
}

export function moveAt (e) {
    let eventBlock = e.target;
    eventBlock.style.top = e.pageY - (eventBlock.offsetHeight/2) + 'px';
    eventBlock.style.left = e.pageX - (eventBlock.offsetWidth/2) + 'px';
}


