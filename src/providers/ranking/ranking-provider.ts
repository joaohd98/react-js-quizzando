import {AxiosPromise} from "axios";
import axios from "axios";
import {EndPoints} from "../../constants/end-points";

export interface RankingRequestInterace {
  id_tema: number;
  nome: string;
  qt_questoes: number;
}

export class RankingProvider{

  verRanking(id_tema: number): AxiosPromise<any>{

    return axios(EndPoints.verRanking + id_tema);

  }

  adicionarRanking(request: RankingRequestInterace): AxiosPromise<any>{

    return axios.post(EndPoints.adicionarRanking, request);

  }

}
