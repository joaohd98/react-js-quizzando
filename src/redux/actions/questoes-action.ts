import {PerguntaProvider} from "../../providers/pergunta/pergunta-provider";

export const DEFINIR_QUESTAO = 'DEFINIR_QUESTAO';
export const VERIFICAR_QUESTAO_CARREGANDO = 'VERIFICAR_QUESTAO_CARREGANDO';
export const VERIFICAR_QUESTAO_SUCESSO = 'VERIFICAR_QUESTAO_SUCESSO';
export const VERIFICAR_QUESTAO_ERRO = 'VERIFICAR_QUESTAO_ERRO';

export function verificar_resposta_certa(id_questao: number, dispatch) {

  let api = new PerguntaProvider().verificarRespostaCerta(id_questao);

  dispatch({type: VERIFICAR_QUESTAO_CARREGANDO});

  api.then(res => res.json()).then(
    id_correta => dispatch({type:  VERIFICAR_QUESTAO_SUCESSO, payload: {id_correta}}),
    () => dispatch({type: VERIFICAR_QUESTAO_ERRO})
  );

}

