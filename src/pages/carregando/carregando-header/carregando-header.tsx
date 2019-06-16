import * as React from "react";
import {AlertProvider} from "../../../providers/alert-provider";
import Header from "../../../components/header/header";
import {Usuario} from "../../../models/usuario";

interface headerInterface {
  usuario: Usuario
}

export class CarregandoHeader extends React.Component<headerInterface> {

  desistir() {

    let alertProvider: AlertProvider = new AlertProvider();

    alertProvider.desistir(() => {


    });

  };

  botaoDesistir(){

    if(this.props.usuario.vidas > 0)
      return <span className="span-link" onClick={this.desistir.bind(this)}>Desistir</span>;

    else
      return <span/>

  }

  botaoPontuacao(){

    return `Pontuação: ${this.props.usuario.qt_questoes}`;

  }

  render(){

    return (
      <Header left={this.botaoDesistir()} right={this.botaoPontuacao()}/>
    );

  }

}
