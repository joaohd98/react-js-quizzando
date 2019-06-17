import { loginReducer } from "./reducers/login-reducer";
import { temaReducer } from "./reducers/tema-reducer";
import {questoesCarregandoReducer} from "./reducers/questoes-carregando-reducer";
import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import {questoesReducer} from "./reducers/questoes-reducer";

export default (history) => combineReducers({
  router: connectRouter(history),
  loginReducer,
  temaReducer,
  questoesCarregandoReducer,
  questoesReducer
});
