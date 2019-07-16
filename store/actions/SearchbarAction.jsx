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
          payload: results
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

module.exports = {
  fetchPosts,
  changeValue
};
