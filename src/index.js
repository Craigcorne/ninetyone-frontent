import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";
// import Cookies from "./components/Cookies";

ReactDOM.render(
  <Provider store={Store}>
    {/* <Cookies /> */}
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
