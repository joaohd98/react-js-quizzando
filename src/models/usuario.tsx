import {LocalStorage} from "../helpers/LocalStorage";

export class Usuario {

  nome: string = "";
  vidas: number = 3;
  qt_questoes: number = 0;

  static entrar(nome: string) {

    let usuario = new Usuario();

    usuario.nome = nome;

    LocalStorage.salvarDados("usuario", usuario);

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
    usuarioObject.vidas = usuario.vidas;
    usuarioObject.qt_questoes = usuario.qt_questoes;

    return usuarioObject;


  }

  iniciarJogo(){

    let usuario = new Usuario();

    usuario.nome = this.nome;
    usuario.vidas = 3;
    usuario.qt_questoes = 0;

    LocalStorage.salvarDados("usuario", usuario);

  }

}
