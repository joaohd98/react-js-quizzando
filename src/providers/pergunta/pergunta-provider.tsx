import {EndPoints} from "../../constants/end-points";

export class PerguntaProvider {

  pegarPergunta(id_tema: number, id_respondidas: number[]){

    return fetch(EndPoints.pegarPergunta, {
      method: "post",
      body: JSON.stringify({ id_tema, id_respondidas })
    });

  }

  verificarRespostaCerta(id_questao: number){

    return fetch(EndPoints.verificarResposta, {
      method: "post",
      body: JSON.stringify({ id_questao })
    });

  }

}
