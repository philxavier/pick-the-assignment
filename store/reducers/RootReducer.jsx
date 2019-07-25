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
  // checkboxOptionStatus:false
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
        postFromSearchbar: action.payload[2],
        filteredListOfPosts: action.payload[3],
        checkBoxOptionStatus: true
      };
    case "RESET_POST_FROM_SEARCHBAR":
      return {
        ...state,
        postFromSearchbar: null,
        barValue: ""
      };
    case "RESET_SIDEBAR_CONFIG":
      return {
        ...state,
        filters: { classOfPost: [], type: [], currentRates: [] },
        clearSidebar: true
      };
    case "HANDLE_SWITCH_CLASS_CHANGE":
      let newClassOfPost = state.filters.classOfPost.slice();
      HelperFuncs.buildNewClassOfPost(newClassOfPost, action.payload);
      return {
        ...state,
        clearSidebar: false,
        filters: {
          classOfPost: newClassOfPost,
          type: state.filters.type,
          currentRates: state.filters.currentRates
        }
      };
    case "HANDLE_TYPE_CHANGE":
      debugger;
      let newTypeOfPost = state.filters.type.slice();

      HelperFuncs.buildNewTypeOfPost(newTypeOfPost, action.payload);

      return {
        ...state,
        filters: {
          type: newTypeOfPost,
          classOfPost: state.filters.classOfPost,
          currentRates: state.filters.currentRates
        },
        clearSidebar: false
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
        },
        clearSidebar: false
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
      return {
        ...state,
        filteredListOfPosts: resultArray
      };
    case "CHANGE_CHECKBOX_STATUS":
      return {
        ...state,
        checkboxOptionStatus: !state.checkboxOptionStatus
      };

    case "CLEAR_TYPE":
      return {
        ...state,
        filters: {
          type: [],
          classOfPost: state.filters.classOfPost,
          currentRates: state.filters.currentRates
        }
      };
    case "CLEAR_CLASS":
      return {
        ...state,
        filters: {
          type: state.filters.type,
          classOfPost: [],
          currentRates: state.filters.currentRates
        }
      };

    case "CLEAR_BOSS_RATE":
      return {
        ...state,
        filters: {
          type: state.filters.type,
          classOfPost: state.filters.classOfPost,
          currentRates: []
        }
      };

    default:
      return state;
  }
};

export default SearchBarReducer;
