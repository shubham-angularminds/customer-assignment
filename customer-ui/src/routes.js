import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";
import Header from "./components/Header";

const routes = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={List} />
        <Route exact path="/customer/add" component={Home} />
        <Route exact path="/customer/edit/:id" component={Edit} />
        <Route exact path="/customer/:id" component={Profile} />
      </Switch>
    </div>
  );
};

export default routes;
