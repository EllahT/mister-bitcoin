/* eslint import/first: 0 */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";

// Load fortawesome icons packages
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, fab);

import "./assets/scss/index.scss";
import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();

window.addEventListener("beforeinstallprompt", e => {
  console.log("beforeinstallprompt event has fired");
  e.prompt();
});
