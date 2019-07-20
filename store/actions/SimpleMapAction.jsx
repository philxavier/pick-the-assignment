const reRenderMap = resultArray => {
  return {
    type: "RE_RENDER_MAP",
    payload: resultArray
  };
};

const setFullListOfPosts = fullListOfPosts => {
  return {
    type: "SET_FULL_LIST_OF_POSTS",
    payload: fullListOfPosts
  };
};

module.exports = {
  reRenderMap,
  setFullListOfPosts
};
