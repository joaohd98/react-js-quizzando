import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import Temas from "../pages/temas/temas";
import {GuestRoute, LoggedRoute} from "../guard/guard";
import Inicio from "../pages/inicio/inicio";

function Layout() {

  return (
    <BrowserRouter>
      <LoggedRoute path={"/"} pathRedirect={"/login"} exact={true} component={Temas} />
      <GuestRoute path={"/login"} pathRedirect={"/"} exact={true} component={Inicio} />
    </BrowserRouter>
  );
}



export default Layout;
