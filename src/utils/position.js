import { ADD_EVENT_WIDTH, ADD_EVENT_HEIGHT, EVENT_CONTAINER_POPUP_WIDTH } from '../constants/handlersConstants.js';

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

export function countEventsContainerPopupPosition (dayPosition, height) {
  let windowWidth = document.body.clientWidth;
  let windowHeight = document.body.clientHeight;
  let overWidth = windowWidth - dayPosition.left - EVENT_CONTAINER_POPUP_WIDTH;
  let overHeight = windowHeight - dayPosition.top - height;
  let actualLeft = (overWidth < 0) ? (dayPosition.left + overWidth) : dayPosition.left;
  let actualTop = (overHeight < 0) ? (dayPosition.top + overHeight) : dayPosition.top;

  return {
    top: actualTop,
    left: actualLeft
  };
}

export function getCoords(elem) { 
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

export function moveAt (e) {
    let eventBlock = e.target;
    console.log(eventBlock);
    let coord = getCoords(eventBlock);
    let shiftX = e.pageX - coord.left;
    let shiftY = e.pageY - coord.top;
    eventBlock.style.top = e.pageY - shiftY  + 'px';
    eventBlock.style.left = e.pageX - shiftX + 'px';
}


