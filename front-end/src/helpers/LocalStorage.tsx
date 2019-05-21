export class LocalStorage {

  static pegarDados(parametro: string){

    return JSON.parse(localStorage.getItem(parametro) || "");

  }

  static salvarDados(parametro: string, dados: object | string){

    localStorage.setItem(parametro, JSON.stringify(dados));

  }

  static apagarDados(parametro: string){

    localStorage.removeItem(parametro);

  }

}
