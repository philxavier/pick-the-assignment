import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { createStore } from "redux";
import SearchBarReducer from "../../store/reducers/SearchBarReducer.jsx";
import { Provider } from "react-redux";

const store = createStore(SearchBarReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
