import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "../../store/reducers/RootReducer.jsx";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
