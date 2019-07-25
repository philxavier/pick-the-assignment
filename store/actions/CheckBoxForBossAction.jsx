const handleBossRateChange = inputRate => {
  return {
    type: "HANDLE_BOSS_RATE_CHANGE",
    payload: inputRate
  };
};

module.exports = {
  handleBossRateChange
};
