const handleTypeChange = inputType => {
  return {
    type: "HANDLE_TYPE_CHANGE",
    payload: inputType
  };
};


const changeCheckboxStatus = () => {
  return {
    type: "CHANGE_CHECKBOX_STATUS",
  };
};

module.exports = {
  handleTypeChange,
  changeCheckboxStatus
};
