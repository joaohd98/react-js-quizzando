import {LocalStorage} from "../helpers/LocalStorage";
import browserHistory from "../redux/store/browserHistory";

export class Usuario {

  nome: string = "";
  vidas: number = 3;
  qt_questoes: number = 0;
  id_respondidas: number[] = [];

  static entrar(nome: string) {

    LocalStorage.salvarDados("usuario", {
      nome: nome
    });

    browserHistory.replace("/")

  }

  static sair(){

    LocalStorage.apagarDados("usuario");

    browserHistory.replace("/login")

  }

  static pegarUsuario(){

    let usuario: Usuario = LocalStorage.pegarDados("usuario");

    if(!usuario)
      return usuario;

    let usuarioObject = new Usuario();
    usuarioObject.nome = usuario.nome;

    return usuarioObject;

  }

  iniciarJogo(){

    this.vidas = 3;
    this.qt_questoes = 0;
    this.id_respondidas = [];

  }

  pontuar() {
    this.qt_questoes++;
  }

  perderVida() {
    this.vidas--;
  }

  adicionarRespondida(id: number) {
    this.id_respondidas.push(id);
  }

}
