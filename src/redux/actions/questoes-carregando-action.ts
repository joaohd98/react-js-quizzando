import {Tema} from "../../models/tema";
import {PerguntaProvider} from "../../providers/pergunta/pergunta-provider";
import {DEFINIR_QUESTAO} from "./questoes-action";

export const DEFINIDO_TEMA = 'DEFINIDO_TEMA';
export const DEFINIDO_MOTIVO = 'DEFINIDO_MOTIVO';
export const QUESTOES_ERRO   = 'QUESTOES_ERRO';
export const QUESTOES_CARREGANDO = 'QUESTOES_CARREGANDO';

export function pegar_questao(id_tema: number, id_respondidas: number[], dispatch) {

  let api = new PerguntaProvider().pegarPergunta(id_tema, id_respondidas);

  dispatch({type: QUESTOES_CARREGANDO});

  api.then(res => res.json()).then(
    questao => dispatch({type: DEFINIR_QUESTAO, payload: {questao}}),
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
