import * as React from 'react';
import './questoes.scss';
import {Usuario} from "../../models/usuario";
import {Questao} from "../../models/questao";
import browserHistory from "../../redux/store/browserHistory";
import {QuestaoHeader} from "./questao-header/questao-header";
import {QuestaoTexto} from "./questao-texto/questao-texto";
import {QuestaoTempo} from "./questao-tempo/questao-tempo";
import {QuestaoAlternativas} from "./questao-alternativas/questao-alternativas";

interface QuestoesInterface {
  usuario: Usuario,
  questao: Questao,
  tempo: number,
  finalizado: boolean
  erro: boolean,
  carregando: boolean
}

class Questoes extends React.Component<QuestoesInterface> {

  componentWillMount(){

    if (this.props.questao === null)
      browserHistory.push('/');

  }

  render() {

    let props = this.props;

    return (
      <div className="questoes">
        <form>
          <QuestaoHeader usuario={props.usuario} />
          <QuestaoTexto questao={props.questao}/>
          <QuestaoTempo usuario={props.usuario} tempo={props.tempo} />
          <QuestaoAlternativas questao={props.questao} carregando={props.carregando} erro={props.erro} finalizado={props.finalizado}  />
        </form>
      </div>
    );

  }

}

export default Questoes;
