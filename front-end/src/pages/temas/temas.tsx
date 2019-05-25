import * as React from 'react';
import './temas.scss';
import {Usuario} from "../../guard/usuario";

class Temas extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();

  render() {
    return (
        <div className="temas">
          <div className="row-header">
            <p>{`Olá, ${this.usuario.nome}`}</p>
            <p>
              Sair
            </p>
          </div>
        </div>
    );
  }

}

export default Temas;
