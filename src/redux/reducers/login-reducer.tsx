import {LOGAR,} from '../actions/action-types';
import {StateInterface} from "../../components/input/input";
import {Usuario} from "../../models/usuario";
import {push} from "connected-react-router";

const initialState: { nome: StateInterface } = {
  nome: {
    validations: [
      {
        regra: "required",
        texto: "Campo nome é obrigatório."
      },
      {
        regra: "min-length",
        paramtros: {numero: 3},
        texto: "Campo tem que ter no mínimo 3 letras."
      }, {
        regra: "max-length",
        paramtros: {numero: 20},
        texto: "Campo tem que ter no máximo 20 letras."
      },
    ]
  }
};

export const loginReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOGAR: return {

      entrar: (nome: string) => {


      },
      ...state
    };
    default:
      return state

  }

};
