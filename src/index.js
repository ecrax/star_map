import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Planet from "./Planet";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Galaxy from "./Galaxy";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/galaxy" />
        </Route>
        <Route path="/planet/" component={Planet} />
        <Route path="/galaxy/" component={Galaxy} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
