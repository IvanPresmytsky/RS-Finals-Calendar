var initialState = {
  index: 0
}

function calendarState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case 'SET_MONTH':
      return Object.assign({}, state, {index: action.payLoad});
    default:
      return state;
  }
}

module.exports = calendarState;
