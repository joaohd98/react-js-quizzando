import * as React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Inicio from "../pages/inicio/inicio";
import Temas from "../pages/temas/temas";

function Layout() {

  return (
    <BrowserRouter>
      <Route path={"/"} exact={true} component={Inicio}/>
      <Route path={"/temas"} component={Temas}/>
    </BrowserRouter>
  );
}



export default Layout;
