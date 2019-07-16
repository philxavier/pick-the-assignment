import namesOfCities from "../../database-mongo/postsString.js";

let initState = {
  barValue: "",
  namesOfCities: namesOfCities.namesOfCities,
  suggestions: [],
  activeSuggestions: false
};

const SearchBarReducer = (state = initState, action) => {
  switch (action.type) {
    case "TYPED":
      return {
        ...state,
        barValue: action.payload
      };

    default:
      return state;
  }
};

export default SearchBarReducer;
