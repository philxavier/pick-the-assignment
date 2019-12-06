const setCurrentPostRatingOfRatings = rating => {
  return {
    type: "SET_RATING_OF_RATINGS",
    payload: rating
  };
};

module.exports = {
  setCurrentPostRatingOfRatings
};
