import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Header from "../../../components/header/header";
import {AlertProvider} from "../../../providers/alert-provider";
import {Usuario} from "../../../models/usuario";
import "./tema-header.scss";

interface TemaHeaderInterface {
  nome: string;
}

export class TemaHeader extends React.Component<TemaHeaderInterface>{

  constructor(props){
    super(props);

    this.sair = this.sair.bind(this);

  }

  sair(){

    let alert: AlertProvider = new AlertProvider();

    alert.sair(() => Usuario.sair());

  };

  render(){

    return (
      <Header
        left={`Olá, ${this.props.nome}`}
        right={<span className="span-link" onClick={this.sair}><FontAwesomeIcon icon="sign-out-alt" color="white"/>Sair</span>}
      />
    );

  }




}
