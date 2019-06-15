import {EndPoints} from "../../constants/end-points";

export class TemaProvider {

  pegarTemas(){

    return fetch(EndPoints.pegarTemas);

  }
}

