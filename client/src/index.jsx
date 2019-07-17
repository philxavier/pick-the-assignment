import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { createStore, applyMiddleware } from "redux";
import RootReducer from "../../store/reducers/RootReducer.jsx";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(RootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
