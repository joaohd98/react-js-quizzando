import * as React from "react";
import "./carregando-botao-submit.scss";
import {Usuario} from "../../../models/usuario";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RequestErro from "../../../components/request-erro/request-erro";
import ButtonSubmit from "../../../components/button-submit/button-submit";

interface BotaoSubmitInterface {
  usuario: Usuario,
  motivo: 'inicio' | 'perdeu' | 'acertou',
  carregando: boolean,
  erro: boolean,
  pegarQuestao: Function
}

export class CarregandoBotaoSubmit extends React.Component<BotaoSubmitInterface> {

  funcChamda(){

    return this.props.usuario.vidas > 0 ? () => this.props.pegarQuestao() : () => {} /* TODO this.carregarPergunta.bind(this) : this.adicionarRanking.bind(this) */

  }

  gerarConteudo() {

    if(this.props.erro)
      return <RequestErro texto="Não foi possível buscar pergunta." func={this.funcChamda()}/>;

    else if(this.props.carregando)
      return (
        <div>
          <FontAwesomeIcon icon="spinner"/>
          <p>Carregando...</p>
        </div>
      );

    else
      return <ButtonSubmit texto={this.props.motivo === "inicio" ? "INICIAR" : this.props.usuario.vidas > 0 ? "CONTINUAR" : "Ranking"} func={this.funcChamda()}/>;

  }

  render() {

    return (
      <div className="continuar-button">
        { this.gerarConteudo() }
      </div>
    );

  }

}
