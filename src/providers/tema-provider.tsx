import Axios from "axios";

export class TemaProvider {

  pegarTemas(){

    Axios.get("").then(() => {


    }).catch(() => {

    });

  }

}
