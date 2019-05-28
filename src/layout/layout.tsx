import * as React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Temas from "../pages/temas/temas";
import {GuestRoute, LoggedRoute} from "../guard/guard";
import Inicio from "../pages/inicio/inicio";
import Erro404 from "../pages/erros/erro-404/erro-404";

function Layout() {

  return (
    <BrowserRouter>
      <Switch>
        <LoggedRoute path={"/"} pathRedirect={"/login"} exact component={Temas} />
        <GuestRoute path={"/login"} pathRedirect={"/"} exact component={Inicio} />
        <Route path="*"  component={Erro404}/>
      </Switch>
    </BrowserRouter>
  );
}



export default Layout;
