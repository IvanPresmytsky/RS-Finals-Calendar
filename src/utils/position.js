import { ADD_EVENT_WIDTH, ADD_EVENT_HEIGHT, DAY_EVENTS_POPUP_WIDTH } from '../constants/sizes.js';

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

export function countDayEventsPopupPosition (dayPosition, height) {
  let windowWidth = document.body.clientWidth;
  let windowHeight = document.body.clientHeight;
  let overWidth = windowWidth - dayPosition.left - DAY_EVENTS_POPUP_WIDTH;
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

export function moveAt (e, positionAPI) {
    let event = positionAPI.event;
    let eventShiftX = positionAPI.shiftX;
    let eventShiftY = positionAPI.shiftY;
    let monthBody = positionAPI.monthBody;

    let monthBodyCoords = getCoords(monthBody);
    let monthBodyWidth = monthBody.offsetWidth;
    let monthBodyHeight = monthBody.offsetHeight;
    let eventWidth = event.offsetWidth;
    let eventHeight = event.offsetHeight;
    let eventLeft = e.pageX - eventShiftX;
    let eventTop = e.pageY - eventShiftY;

    if (monthBodyWidth + monthBodyCoords.left <= (e.pageX + eventWidth - eventShiftX)) {
      eventLeft = monthBodyWidth + monthBodyCoords.left - eventWidth;
    }
    if ((e.pageX - eventShiftX) < monthBodyCoords.left) {
      eventLeft = monthBodyCoords.left;
    }
    if (monthBodyHeight + monthBodyCoords.top <= (e.pageY + eventHeight - eventShiftY)) {
      eventTop = monthBodyHeight + monthBodyCoords.top - eventHeight - 1;
    }
    if ((e.pageY - eventShiftY) < monthBodyCoords.top) {
      eventTop = monthBodyCoords.top;
    }

    event.style.opacity = '0.5';
    event.style.top = eventTop + 'px';
    event.style.left = eventLeft + 'px';
}


