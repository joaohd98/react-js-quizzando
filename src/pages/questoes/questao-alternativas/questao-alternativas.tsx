import * as React from "react";
import './questao-alternativas.scss'
import {Alternativa, Questao} from "../../../models/questao";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AlertProvider} from "../../../providers/alert-provider";
import browserHistory from "../../../redux/store/browserHistory";

interface QuestaoAlternativasInterface {
  questao: Questao
  finalizado: boolean,
  carregando: boolean,
  erro: boolean,
}

export class QuestaoAlternativas extends React.Component<QuestaoAlternativasInterface> {

  definirClasse(alternativa: Alternativa){

    if(this.props.finalizado){

      if(alternativa.selecionada) {

        if(alternativa.correta)
          return 'alternativa-certa';

        else
          return 'alternativa-errada';

      }

      else if(alternativa.correta)
        return 'alternativa-certa';

      return '';

    }

    else
      return alternativa.selecionada ? 'alternativa-selecionada' : ''

  }

  gerarCarregando(){

    return (
      <div className="carregando">
        <FontAwesomeIcon icon="spinner"/>
        <p>Carregando...</p>
      </div>
    );

  }

  mostrarErro(){

    let alertProvider = new AlertProvider();

    alertProvider.erro_questao_responder();

    browserHistory.replace("questoes/carregando");

  }

  gerarAlternativas(){

    let listaAlternativas: Array<JSX.Element> = [];
    let pointer: "none" | "auto" = this.props.finalizado ? "none" : "auto";

    this.props.questao.alternativas.forEach((alternativa: Alternativa, index) => {

      listaAlternativas.push(
        <div key={alternativa.texto} style={{pointerEvents: pointer}}
             className={`alternativa ${this.definirClasse(alternativa)}`}
             onClick={() => {}}>
          <p>{alternativa.texto}</p>
        </div>
      );
    });

    return listaAlternativas;

  }

  gerarConteudo() {

    if(this.props.erro)
      this.mostrarErro();

    if(this.props.carregando)
      return this.gerarCarregando();

    else
      return this.gerarAlternativas();

  }

  render(){

    return (
      <div className={`row row-alternativas`}>
        { this.gerarConteudo() }
      </div>
    )

  }

}
