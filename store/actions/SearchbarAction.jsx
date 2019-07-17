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

module.exports = {
  fetchPosts,
  changeValue,
  includeValue
};
