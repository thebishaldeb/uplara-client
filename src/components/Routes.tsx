import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Users from "./Users";
import UserSignUp from "./UserSignUp";
import Game from "./Game";
import MyGames from "./MyGames";
import Navbar from "./Navbar";
import Invites from "./Invites";

const Routes = () => {
  const RedirectToLogin = ({ component: Component, ...rest }: any) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("auth_token") ? (
            <Navbar>
              <Component {...props} />
            </Navbar>
          ) : (
            <Redirect to="/sign-in" />
          )
        }
      />
    );
  };

  const RedirectToHome = ({ component: Component, ...rest }: any) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("auth_token") ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  };
  return (
    <Switch>
      <RedirectToLogin exact path="/" component={Users} />
      <RedirectToHome exact path="/sign-in" component={UserSignUp} />
      <RedirectToLogin path="/my-games" component={MyGames} />
      <RedirectToLogin path="/invites" component={Invites} />
      <RedirectToLogin path="/game/:id" component={Game} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
