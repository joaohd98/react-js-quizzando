import * as React from "react";
import './questao-texto.scss'
import {Questao} from "../../../models/questao";

interface QuestaoTextoInterface {
  questao: Questao
}

export class QuestaoTexto extends React.Component<QuestaoTextoInterface> {

  render() {

    return (
      <div className={`row row-pergunta`}>
        <p>
          {this.props.questao.texto}
        </p>
      </div>
    );

  }

}
