import {Usuario} from "../../models/usuario";
import {Questao} from "../../models/questao";
import {DEFINIR_QUESTAO} from "../actions/questoes-action";

export interface QuestoesReduxInterface {
  usuario: Usuario,
  questao: Questao | null,
  tempo: number,
  erro: boolean,
  carregando: boolean
}

const initialState: QuestoesReduxInterface = {
  usuario: Usuario.pegarUsuario(),
  questao: null,
  tempo: 15,
  erro: false,
  carregando: false
};

export const questoesReducer = (state = initialState, action) => {

  switch (action.type) {

    case DEFINIR_QUESTAO: {

      state.questao = action.payload.questao;

      return state;

    }

    default:
      return state

  }

};
