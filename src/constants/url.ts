import {number} from "prop-types";

export class Url {

  static baseURL: string = process.env.REACT_APP_URL || "";

  static pegarTemas = {
    url: `${Url.baseURL}/temas`,
    parametros: {}
  };

}


