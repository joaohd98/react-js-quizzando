import {StateInterface} from "../../components/input/input";

export const LOGAR_SUCESSO = 'LOGAR_SUCESSO';
export const MUDAR_INPUT_LOGIN = 'MUDAR_INPUT_LOGIN';

export const entrar = (nome: string) => {
  return {
    type: LOGAR_SUCESSO,
    payload: {
       nome
    }
  }
};
export const mudar_input_login = (state: StateInterface) => {
  return {
    type: MUDAR_INPUT_LOGIN,
    payload: {
      state
    }
  }
};
