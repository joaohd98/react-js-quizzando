import axios, {AxiosPromise} from 'axios';
import {EndPoints} from "../../constants/end-points";
import {Tema} from "../../models/tema";

export class TemaProvider {

  /*
  pegarTemas(): AxiosPromise<Tema[]>{

    return axios(EndPoints.pegarTemas);

  }
  */
  pegarTemas(){

    return fetch(EndPoints.pegarTemas);

  }
}

