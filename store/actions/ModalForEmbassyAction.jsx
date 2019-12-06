const setSizeOfCurrentPostReviewArray = reviewArraySize => {
  return {
    type: "SET_SIZE_OF_CURRENT_POST_REVIEW_ARRAY",
    payload: reviewArraySize
  };
};

module.exports = {
  setSizeOfCurrentPostReviewArray
};
