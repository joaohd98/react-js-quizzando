import {LocalStorage} from "../helpers/LocalStorage";

export class Usuario {

  nome: string = "";
  vidas: number = 3;
  qt_questoes: number = 0;
  idRespondidas: Array<number> = [];

  static entrar(nome: string) {

    LocalStorage.salvarDados("usuario", {
      nome: nome
    });

  }

  static sair(){

    LocalStorage.apagarDados("usuario");

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

  }

}
