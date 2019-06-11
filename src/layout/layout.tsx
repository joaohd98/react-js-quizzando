import * as React from "react";
import {Route, Switch} from "react-router-dom";
import Temas from "../pages/temas/temas";
import {GuestRoute, LoggedRoute} from "../guard/guard";
import Inicio from "../pages/inicio/inicio";
import Erro404 from "../pages/erros/erro-404/erro-404";
import Questoes from "../pages/questoes/questoes";
import Carregando from "../pages/questoes/carregando/carregando";
import Ranking from "../pages/ranking/ranking";
import { Provider } from 'react-redux';
import configureStore, { history } from "../redux/store/store";
import { ConnectedRouter } from 'connected-react-router'


function Layout() {

  const store = configureStore();

  return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <LoggedRoute path={"/"} pathRedirect={"/login"} exact component={Temas} />
            <LoggedRoute path={"/questoes"} pathRedirect={"/login"} exact component={Questoes} />
            <LoggedRoute path={"/questoes/carregando"} pathRedirect={"/login"} exact component={Carregando} />
            <LoggedRoute path={"/ranking"} pathRedirect={"/ranking"} exact component={Ranking} />
            <GuestRoute path={"/login"} pathRedirect={"/"} exact component={Inicio} />
            <Route path="*"  component={Erro404}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
  );
}



export default Layout;
