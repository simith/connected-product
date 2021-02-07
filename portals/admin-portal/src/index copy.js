import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import VideoApp from "./VideoApp";
import * as serviceWorker from "./serviceWorker";
import config from "./aws-exports";
import Amplify from "aws-amplify";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Blank from './components/Blank'

console.log(config);
Amplify.configure(config);


ReactDOM.render(
  <BrowserRouter>
  <VideoApp />
  </BrowserRouter>
,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
