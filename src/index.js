import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";

import { Router } from "@reach/router";

import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App path="/" />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
