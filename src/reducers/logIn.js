var initialState = {
  visibility: false
}

function addLogInFormState (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {visibility: action.payLoad});
    default:
      return state;
  }
}

module.exports = addLogInFormState;