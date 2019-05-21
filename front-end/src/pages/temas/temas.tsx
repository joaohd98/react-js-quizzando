import * as React from 'react';
import './temas.scss';
import Titulo from "../../components/titulo/titulo";
import {Usuario} from "../../guard/Usuario";

class Temas extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();

  render() {
    return (
        <div>
          <Titulo texto={`Olá, ${this.usuario.nome}`}/>
        </div>
    );
  }

}

export default Temas;
