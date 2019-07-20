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
  },
  fullListOfPosts: [],
  filteredListOfPosts: []
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
    case "HANDLE_TYPE_CHANGE":
      let newTypeOfPost = state.filters.type.slice();

      HelperFuncs.buildNewTypeOfPost(newTypeOfPost, action.payload);

      return {
        ...state,
        filters: {
          type: newTypeOfPost,
          classOfPost: state.filters.classOfPost,
          currentRates: state.filters.currentRates
        }
      };

    case "HANDLE_BOSS_RATE_CHANGE":
      let newRatesArr = state.filters.currentRates.slice();

      HelperFuncs.buildNewRates(newRatesArr, action.payload);

      return {
        ...state,
        filters: {
          type: state.filters.type,
          classOfPost: state.filters.classOfPost,
          currentRates: newRatesArr
        }
      };

    case "SET_FULL_LIST_OF_POSTS":
      return {
        ...state,
        fullListOfPosts: action.payload
      };

    case "RE_RENDER_MAP":
      let filterOfClass = state.filters.classOfPost;
      let filterOfType = state.filters.type;
      let filterOfRates = state.filters.currentRates;
      debugger;
      let filteredArray = state.fullListOfPosts.slice();

      let filteredByType = HelperFuncs.filterByType(
        filteredArray,
        filterOfType
      );
      let filteredByClass = HelperFuncs.filterByClass(
        filteredArray,
        filterOfClass
      );
      let filteredByRates = HelperFuncs.filterByRates(
        filteredArray,
        filterOfRates
      );

      let resultArray = HelperFuncs.mergeArrays(
        filteredByClass,
        filteredByRates,
        filteredByType
      );
      console.log("resultArray", resultArray);
      return {
        ...state,
        filteredListOfPosts: resultArray
      };

    default:
      return state;
  }
};

export default SearchBarReducer;
