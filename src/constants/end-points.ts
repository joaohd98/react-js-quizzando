export class EndPoints {

  static pegarTemas = process.env.REACT_APP_URL + "/temas";
  static pegarPergunta = process.env.REACT_APP_URL + "/perguntas";
  static verificarResposta = process.env.REACT_APP_URL + "/perguntas/resposta";
  static verRanking = process.env.REACT_APP_URL + "/ranking/";
  static adicionarRanking = process.env.REACT_APP_URL + "/ranking/adicionar";

}
