import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";


const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);

 // Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
 // Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
 if (import.meta.hot) {
  import.meta.hot.accept();
}