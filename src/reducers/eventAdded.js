var initialState = {
  events: []
}

function EventsState (state = initialState, action) {
  switch (action.type) {
    case 'EVENT_ADDED':
      return Object.assign({}, state, {events: action.events});
    default:
      return state;
  }
}

module.exports = EventsState;
