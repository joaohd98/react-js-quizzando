import {StateInterface} from "../../components/input/input";
import {Usuario} from "../../models/usuario";
import {TEMA_CARREGANDO, TEMA_ERRO, TEMA_SUCESSO} from "../actions/tema-action";

const initialState: { usuario: Usuario, temas: object, filtro: StateInterface, carregando: boolean, erro: boolean } = {
  usuario: Usuario.pegarUsuario(),
  filtro: {},
  temas: {},
  carregando: true,
  erro: false,
};

export const temaReducer = (state = initialState, action) => {

  switch (action.type) {

    case TEMA_CARREGANDO: return {
      ...state,
      erro: false,
      carregando: true,
    };
    case TEMA_SUCESSO: return {
      ...state,
      temas: action.payload.temas,
      erro: false,
      carregando: false,
    };
    case TEMA_ERRO: return {
      ...state,
      erro: true,
      carregando: false,
    };
    default:
      return state

  }

};
