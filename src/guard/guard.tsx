import * as React from 'react';
import {Redirect, Route} from "react-router";
import {Usuario} from "../models/usuario";


export const LoggedRoute = ({component: Component,  pathRedirect, ...rest}) => (
  <Route {...rest} render={(props) => (
      Usuario.pegarUsuario() ? <Component {...props} /> : <Redirect to={pathRedirect} />
    )}
  />
);

export const GuestRoute = ({component: Component,  pathRedirect, ...rest}) => (
  <Route {...rest} render={(props) =>
    (Usuario.pegarUsuario() ? <Redirect to={pathRedirect} /> : <Component {...props} />
  )}
  />
);
