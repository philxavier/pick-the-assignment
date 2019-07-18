import namesOfCities from "../../database-mongo/postsString.js";
import HelperFuncs from "../../HelperFuncs.js";

let initState = {
  barValue: "",
  namesOfCities: namesOfCities.namesOfCities,
  suggestions: [],
  activeSuggestions: false,
  fetchedPosts: [],
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 1,
  postFromSearchbar: null,
  clearSidebar: false,
  filters: {
    classOfPost: [],
    type: [],
    currentRates: []
  }
};

const SearchBarReducer = (state = initState, action) => {
  switch (action.type) {
    case "TYPED":
      return {
        ...state,
        barValue: action.payload
      };
    case "SEARCH":
      return {
        ...state,
        fetchedPosts: action.payload
      };
    case "INCLUDE_VALUE":
      return {
        ...state,
        barValue: action.payload
      };
    case "CHANGE_MAP_PARAMS":
      return {
        ...state,
        center: action.payload[0],
        zoom: action.payload[1],
        postFromSearchbar: action.payload[2]
      };
    case "RESET_POST_FROM_SEARCHBAR":
      return {
        ...state,
        postFromSearchbar: null,
        barValue: ""
      };
    case "CLEAR_SIDEBAR":
      return {
        ...state,
        clearSidebar: true
      };
    case "HANDLE_SWITCH_CLASS_CHANGE":
      let newClassOfPost = state.filters.classOfPost.slice();

      HelperFuncs.buildNewClassOfPost(newClassOfPost, action.payload);

      return {
        ...state,

        filters: {
          classOfPost: newClassOfPost,
          type: state.filters.type,
          currentRates: state.filters.currentRates
        }
      };
    default:
      return state;
  }
};

export default SearchBarReducer;
