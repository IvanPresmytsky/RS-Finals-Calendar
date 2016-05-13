function register (visibility) {
  return {
    type: 'REGISTER',
    payLoad: visibility
  };
}

module.exports = register;