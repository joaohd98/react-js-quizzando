import {MOSTRAR_LOGIN} from '../actions/action-types';
import {StateInterface} from "../../components/input/input";

export const loginReducer = (state = {}, action) => {

  let nome: StateInterface = {
    validations: [
      {
        regra: "required",
        texto: "Campo nome é obrigatório."
      },
      {
        regra: "min-length",
        paramtros: { numero: 3 },
        texto: "Campo tem que ter no mínimo 3 letras."
      },{
        regra: "max-length",
        paramtros: { numero: 20 },
        texto: "Campo tem que ter no máximo 20 letras."
      },
    ]
  };

  switch (action.type) {

    case MOSTRAR_LOGIN:
      return {
        ...state,
        nome: nome,
        pagina_destino: ""
      };
    default:
      return state;
  }

};
