import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import { Game } from "./components";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Game />
  </StrictMode>,
  rootElement
);
