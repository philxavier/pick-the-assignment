const resetPostFromSearchbar = () => {
  return {
    type: "RESET_POST_FROM_SEARCHBAR"
  };
};

const handleSwitchClassChange = inputClassOfPost => {
  return {
    type: "HANDLE_SWITCH_CLASS_CHANGE",
    payload: inputClassOfPost
  };
};

module.exports = {
  resetPostFromSearchbar,
  handleSwitchClassChange
};
