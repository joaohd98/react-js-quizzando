import * as React from "react";
import "./carregando-erro.scss";
import {Usuario} from "../../../models/usuario";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface CarregandoInterface {
  usuario: Usuario,
  motivo: 'inicio' | 'perdeu'
}

export class CarregandoErro extends React.Component<CarregandoInterface> {

  gerarVidas() {

    return (
      <div>
        <FontAwesomeIcon icon={this.props.usuario.vidas >= 1 ? 'heart' : 'skull-crossbones'}/>
        <FontAwesomeIcon icon={this.props.usuario.vidas >= 2 ? 'heart' : 'skull-crossbones'}/>
        <FontAwesomeIcon icon={this.props.usuario.vidas >= 3 ? 'heart' : 'skull-crossbones'}/>
      </div>
    );

  }

  gerarMensagem() {

    let mensagem = '';

    if (this.props.motivo === "inicio")
      mensagem = "BOA SORTE";

    else if(this.props.usuario.vidas > 0)
      mensagem =  `${this.props.usuario.vidas} vida${this.props.usuario.vidas > 1 ? 's' : ''}`;

    else
      mensagem = "BOM JOGO";

    return (<p>{mensagem}</p>);

  }


  render() {

    return (
      <div className="erro">
        { this.gerarVidas() }
        { this.gerarMensagem() }
      </div>
    );

  }

}
