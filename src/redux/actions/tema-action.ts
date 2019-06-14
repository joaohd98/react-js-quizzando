export const FILTRAR_TEMA = 'LOGAR_SUCESSO';
export const MOVER_TEMA = 'MUDAR_INPUT_LOGIN';

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
