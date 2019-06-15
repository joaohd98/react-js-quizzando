import {StateInterface} from "../../components/input/input";
import {Usuario} from "../../models/usuario";
import {FILTRAR_TEMA, TEMA_CARREGANDO, TEMA_ERRO, TEMA_SUCESSO} from "../actions/tema-action";
import {Helpers} from "../../helpers/helpers";
import {Tema} from "../../models/tema";

const initialState: { usuario: Usuario, temas: Tema[], filtro: StateInterface, carregando: boolean, erro: boolean } = {
  usuario: Usuario.pegarUsuario(),
  filtro: {},
  temas: [],
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
    case FILTRAR_TEMA: {

      let filtro = Helpers.removerAcentosMinusculo(action.payload.filtro.valor);

      state.temas.forEach(tema => tema.mostrar = filtro.length === 0 || Helpers.removerAcentosMinusculo(tema.texto).includes(filtro));

      return {
        ...state,
        filtro: action.payload.filtro,
      };

    }
    default:
      return state

  }

};
