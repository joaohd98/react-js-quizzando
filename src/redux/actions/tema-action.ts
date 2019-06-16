import {TemaProvider} from "../../providers/tema/tema-provider";

export const SELECIONAR_TEMA = 'SELECIONAR_TEMA';
export const INICIALIZAR_SLIDE_TEMA = 'INICIALIZAR_SLIDE_TEMA';
export const FILTRAR_TEMA = 'FILTRAR_TEMA';
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

export const inicializar_slide__tema = (swiper: object) => {
  return {
    type: INICIALIZAR_SLIDE_TEMA,
    payload: {
      swiper
    }

  }
};

export const filtrar_tema = (filtro: string) => {
  return {
    type: FILTRAR_TEMA,
    payload: {
      filtro
    }
  }
};
