function setMonth (index) {
  console.log(index);
  return {
    type: 'SET_MONTH',
    payLoad: index
  };
}

module.exports = setMonth;
