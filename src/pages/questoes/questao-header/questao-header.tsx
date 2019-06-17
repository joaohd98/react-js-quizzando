import * as React from "react";
import './questao-header.scss'
import {AlertProvider} from "../../../providers/alert-provider";
import browserHistory from "../../../redux/store/browserHistory";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Usuario} from "../../../models/usuario";
import Header from "../../../components/header/header";

interface QuestaoHeadersInterface {
  usuario: Usuario
}

export class QuestaoHeader extends React.Component<QuestaoHeadersInterface> {


  desistir() {

    let alertProvider: AlertProvider = new AlertProvider();

    alertProvider.desistir(() => {

      browserHistory.replace("/");

    });

  };

  botaoDesistir() {

    return (
      <span className="span-link" onClick={this.desistir.bind(this)}>Desistir</span>
    )

  }

  mostrarVidas() {

    let vidasElement: Array<JSX.Element> = [];

    for (let i = 3; i > 0; i--) {
      vidasElement.unshift(
        <FontAwesomeIcon key={i} icon={this.props.usuario.vidas >= i ? 'heart' : 'skull-crossbones'}/>
      )
    }

    return vidasElement;

  }

  render() {

    return (
      <Header
        left={this.botaoDesistir()}
        right={this.mostrarVidas()}
      />
    )

  }

}
