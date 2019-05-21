import {LocalStorage} from "../helpers/LocalStorage";

export class Usuario {

  nome: string = "";

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

}
