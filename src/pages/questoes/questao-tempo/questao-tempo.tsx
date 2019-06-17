import * as React from "react";
import './questao-tempo.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Usuario} from "../../../models/usuario";

interface QuestaoTempoInterface {
  usuario: Usuario,
  tempo: number
}
export class QuestaoTempo extends React.Component<QuestaoTempoInterface> {

  render() {

    return (
      <div className={`row row-tempo`}>
            <span>
              Pontuação: {this.props.usuario.qt_questoes}
            </span>
        <span style={{color: (this.props.tempo <= 3 ? "red" : "white")}}>
              {this.props.tempo + "s"}
          <FontAwesomeIcon icon="clock" />
            </span>
      </div>
    );

  }

}
