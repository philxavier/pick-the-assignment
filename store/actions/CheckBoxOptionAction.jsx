const handleTypeChange = inputType => {
  return {
    type: "HANDLE_TYPE_CHANGE",
    payload: inputType
  };
};

module.exports = {
  handleTypeChange
};
