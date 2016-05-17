function addEvent (visibility, position, date) {
  return {
    type: 'ADD_EVENT',
    payLoad: visibility,
    position: position,
    defaultDate: date
  };
}

module.exports = addEvent;
