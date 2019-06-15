import {EndPoints} from "../../constants/end-points";

export interface RankingRequestInterace {
  id_tema: number;
  nome: string;
  qt_questoes: number;
}

export class RankingProvider{

  verRanking(id_tema: number){

    return fetch(EndPoints.verRanking + id_tema);

  }

  adicionarRanking(request: RankingRequestInterace){

    return fetch(EndPoints.adicionarRanking, {
      method: "post",
      body: JSON.stringify(request)
    });

  }

}
