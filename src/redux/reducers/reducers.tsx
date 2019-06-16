import { loginReducer } from "./login-reducer";
import { temaReducer } from "./tema-reducer";
import {questoesCarregandoReducer} from "./questoes-carregando-reducer";
import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

export default (history) => combineReducers({
  router: connectRouter(history),
  loginReducer,
  temaReducer,
  questoesCarregandoReducer
});
