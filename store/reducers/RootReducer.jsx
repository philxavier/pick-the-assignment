import namesOfCities from "../../database-mongo/postsString.js";

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
  postFromSearchbar: null
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
    default:
      return state;
  }
};

export default SearchBarReducer;
