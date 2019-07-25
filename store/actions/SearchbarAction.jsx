import Axios from "axios";

const fetchPosts = value => {
  return dispatch => {
    if (!value.length) {
      dispatch({
        type: "SEARCH",
        payload: []
      });
    } else {
      Axios.get(`/findPost/${value}`).then(results => {
        dispatch({
          type: "SEARCH",
          payload: results.data
        });
      });
    }
  };
};

const changeValue = value => {
  return {
    type: "TYPED",
    payload: value
  };
};

const includeValue = nameOfPost => {
  return {
    type: "INCLUDE_VALUE",
    payload: nameOfPost
  };
};

const changeMapParams = (center, zoom, currentPost, searchResult) => {
  return {
    type: "CHANGE_MAP_PARAMS",
    payload: [center, zoom, currentPost, searchResult]
  };
};

const resetSidebarConfig = () => {
  return {
    type: "RESET_SIDEBAR_CONFIG"
  };
};

const resetPostFromSearchbar = () => {
  return {
    type: "RESET_POST_FROM_SEARCHBAR"
  };
};

module.exports = {
  fetchPosts,
  changeValue,
  includeValue,
  changeMapParams,
  resetSidebarConfig,
  resetPostFromSearchbar
};
