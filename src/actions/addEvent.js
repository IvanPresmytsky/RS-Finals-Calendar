function addEvent (visibility) {
  return {
    type: 'ADD_EVENT',
    payLoad: visibility
  };
}

module.exports = addEvent;
