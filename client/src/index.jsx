import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { createStore, applyMiddleware } from "redux";
import SearchBarReducer from "../../store/reducers/SearchBarReducer.jsx";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(SearchBarReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
