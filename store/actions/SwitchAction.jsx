const handleSwitchClassChange = inputClassOfPost => {
  return {
    type: "HANDLE_SWITCH_CLASS_CHANGE",
    payload: inputClassOfPost
  };
};

module.exports = {
  handleSwitchClassChange
};
