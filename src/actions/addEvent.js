function addEvent (visibility, position) {
  return {
    type: 'ADD_EVENT',
    payLoad: visibility,
    position: position
  };
}

module.exports = addEvent;
