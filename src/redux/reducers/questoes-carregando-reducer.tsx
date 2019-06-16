import {
  DEFINIDO_MOTIVO,
  DEFINIDO_TEMA,
  QUESTOES_CARREGANDO,
  QUESTOES_ERRO
} from "../actions/questoes-carregando-action";
import {Usuario} from "../../models/usuario";
import {Tema} from "../../models/tema";

interface initial_interface {
  usuario: Usuario,
  tema: Tema | null,
  motivo: 'inicio' | 'perdeu' | 'acertou',
  carregando: boolean,
  erro: boolean
}

const initialState: initial_interface = {
  usuario: Usuario.pegarUsuario(),
  tema: null,
  motivo: 'inicio',
  carregando: false,
  erro: false,
};

export const questoesCarregandoReducer = (state = initialState, action) => {

  switch (action.type) {

    case DEFINIDO_TEMA: return {
      ...state,
      tema: action.payload.tema
    };

    case DEFINIDO_MOTIVO: return {
      ...state,
      motivo: action.payload.motivo
    };

    case QUESTOES_ERRO: return {
      ...state,
      carregando: false,
      erro: true
    };

    case QUESTOES_CARREGANDO: return {
      ...state,
      carregando: true,
      erro: false
    };
    default:
      return state

  }

};
