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

const changeMapParams = (center, zoom, currentPost) => {
  return {
    type: "CHANGE_MAP_PARAMS",
    payload: [center, zoom, currentPost]
  };
};

const clearSidebarConfig = () => {
  return {
    type: "CLEAR_SIDEBAR"
  };
};

module.exports = {
  fetchPosts,
  changeValue,
  includeValue,
  changeMapParams,
  clearSidebarConfig
};
