import * as React from 'react';
import './temas.scss';
import {Usuario} from "../../guard/usuario";
import {Redirect} from "react-router";

class Temas extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();

  sair = () => {

    Usuario.sair();

    this.setState({
      'pagina_destino': "/login"
    });

  };

  render() {

    if(this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']}/>;

    return (
        <div className="temas">
          <div className="row-header">
            <p>{`Olá, ${this.usuario.nome}`}</p>
            <p onClick={this.sair}>
              Sair
            </p>
          </div>
        </div>
    );
  }

}

export default Temas;
