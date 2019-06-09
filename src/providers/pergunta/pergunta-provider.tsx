import axios, {AxiosPromise} from 'axios';
import {EndPoints} from "../../constants/end-points";

export class PerguntaProvider {

  pegarPergunta(id_tema: number, id_respondidas: number[]): AxiosPromise<any>{

    return axios.post(EndPoints.pegarPergunta, {
      id_tema, id_respondidas
    });

  }

  verificarRespostaCerta(id_questao: number): AxiosPromise<any>{

    return axios.post(EndPoints.verificarResposta, {
      id_questao
    });

  }

}
