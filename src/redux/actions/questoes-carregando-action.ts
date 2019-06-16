import {Tema} from "../../models/tema";
import {PerguntaProvider} from "../../providers/pergunta/pergunta-provider";

export const DEFINIDO_TEMA = 'DEFINIDO_TEMA';
export const DEFINIDO_MOTIVO = 'DEFINIDO_MOTIVO';
//export const QUESTOES_SUCESSO = 'QUESTOES_SUCESSO';
export const QUESTOES_ERRO   = 'QUESTOES_ERRO';
export const QUESTOES_CARREGANDO = 'QUESTOES_CARREGANDO';

export function pegar_questao(id_tema: number, id_respondidas: number[], dispatch) {

  let api = new PerguntaProvider().pegarPergunta(id_tema, id_respondidas);

  dispatch({type: QUESTOES_CARREGANDO});

  api.then(res => res.json()).then(
    pergunta => dispatch({type: 'teste' /* TODO QUESTOES_SUCESSO*/, payload: {pergunta}}),
    () => dispatch({type: QUESTOES_ERRO})
  );

}

export const definir_motivo = (motivo: string) => {
  return {
    type: DEFINIDO_MOTIVO,
    payload: {
      motivo
    }

  }
};


export const definir_tema = (tema: Tema) => {
  return {
    type: DEFINIDO_TEMA,
    payload: {
      tema
    }

  }
};
