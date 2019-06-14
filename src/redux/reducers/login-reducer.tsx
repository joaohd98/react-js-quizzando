import {StateInterface} from "../../components/input/input";
import {MUDAR_INPUT_LOGIN} from "../actions/login-action";

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

    case MUDAR_INPUT_LOGIN: return ({
      nome: action.payload.state
    });
    default:
      return state

  }

};
