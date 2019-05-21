import {LocalStorage} from "../helpers/LocalStorage";

export class Usuario {

  nome: string = "";
  jaComecouJogo: boolean = false;
  tema: string = "";
  saiuJogo: number = 0;
  vidas: number = 3;
  pontuacao: number = 0;

  static entrar(nome: string) {

    let usuario = new Usuario();

    usuario.nome = nome;

    LocalStorage.salvarDados("usuario", usuario);

  }

  static sair(){

    LocalStorage.apagarDados("usuario");

  }

  static pegarUsuario(){

    return LocalStorage.pegarDados("usuario");

  }

  static iniciarJogo(tema: string) {

    let usuario = LocalStorage.pegarDados("usuario");

    usuario.jaComecouJogo = true;
    usuario.tema = tema;
    usuario.saiuJogo = 0;
    usuario.vidas = 3;

    LocalStorage.salvarDados("usuario", usuario);

  }

  static acertar() {

    let usuario = LocalStorage.pegarDados("usuario");

    usuario.pontuacao++;

    LocalStorage.salvarDados("usuario", usuario);

  }

  static errar() {

    let usuario = LocalStorage.pegarDados("usuario");

    usuario.vidas--;

    LocalStorage.salvarDados("usuario", usuario);

  }

}
