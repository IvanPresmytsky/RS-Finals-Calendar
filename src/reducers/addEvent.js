var initialState = {
  visibility: false,
  position: {top: 0, left: 0},
  defaultDate: null
}

function addEventState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case 'ADD_EVENT':
      return Object.assign({}, state, {visibility: action.payLoad, position: action.position, defaultDate: action.defaultDate});
    default:
      return state;
  }
}

module.exports = addEventState;
