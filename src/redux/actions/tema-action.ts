import {TemaProvider} from "../../providers/tema/tema-provider";

export const FILTRAR_TEMA = 'FILTRAR_TEMA';
export const MOVER_TEMA = 'MOVER_TEMA';
export const TEMA_SUCESSO = 'TEMA_SUCESSO';
export const TEMA_ERRO = 'TEMA_ERRO';
export const TEMA_CARREGANDO = 'TEMA_CARREGANDO';

export function pegar_temas(dispatch) {

  let api = new TemaProvider().pegarTemas();

  dispatch({type: TEMA_CARREGANDO});

  api.then(res => res.json()).then(
    temas => dispatch({type: TEMA_SUCESSO, payload: {temas}}),
    () => dispatch({type: TEMA_ERRO})
  );

}

export const filtrar_tema = (filtro: string) => {
  return {
    type: FILTRAR_TEMA,
    payload: {
      filtro
    }
  }
};
export const mover_tema = (direcao: "esquerda" | "direita") => {
  return {
    type: MOVER_TEMA,
    payload: {
      direcao
    }
  }
};
