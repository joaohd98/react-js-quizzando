import {EndPoints} from "../../constants/end-points";

export class PerguntaProvider {

  pegarPergunta(id_tema: number, id_respondidas: number[]){

    return fetch(EndPoints.pegarPergunta, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({ id_tema, id_respondidas })
    });

  }

  verificarRespostaCerta(id_questao: number){

    return fetch(EndPoints.verificarResposta, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({ id_questao })
    });

  }

}
