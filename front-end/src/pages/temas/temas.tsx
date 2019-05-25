import * as React from 'react';
import './temas.scss';
import {Usuario} from "../../guard/usuario";
import {Redirect} from "react-router";

class Temas extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();

  sair(){

    Usuario.sair();

  }

  render() {
    return (
        <div className="temas">
          <div className="row-header">
            <p>{`Olá, ${this.usuario.nome}`}</p>
            <button onClick={this.sair}>
              Sair
            </button>
          </div>
        </div>
    );
  }

}

export default Temas;
