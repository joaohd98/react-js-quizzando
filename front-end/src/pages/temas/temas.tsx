import * as React from 'react';
import './temas.scss';
import {Usuario} from "../../guard/usuario";
import {Redirect} from "react-router";
import Titulo from "../../components/titulo/titulo";
import ButtonSubmit from "../../components/button-submit/button-submit";

class Temas extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();

  sair = () => {

    Usuario.sair();

    this.setState({
      'pagina_destino': "/login"
    });

  };

  selecionadoTema = () => {

  };

  render() {

    if(this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']}/>;

    return (
        <div className="temas">
          <form onSubmit={this.selecionadoTema} method="post">
            <div className={`row row-header`}>
              <p>{`Olá, ${this.usuario.nome}`}</p>
              <p onClick={this.sair}>
                Sair
              </p>
            </div>
            <div className={`row row-sub-header`}>
              <Titulo texto="TEMAS"/>
            </div>
            <div className={`row selecionar-tema`}>
              <div className="card">
                <img src="https://www.guiabh.com.br/Repositorio/Upload/Destaque/320x320/cinema-com-desconto-em-bh-imagem.jpg" alt=""/>
                <p>Texto</p>
              </div>
            </div>
            <ButtonSubmit texto="Selecionar"/>
          </form>
        </div>
    );
  }

}

export default Temas;
