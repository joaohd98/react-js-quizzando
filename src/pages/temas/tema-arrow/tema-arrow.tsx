import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './tema-arrow.scss'

interface TemaArrowInterface{
  mostrar: boolean;
}

export class TemaArrow extends React.Component<TemaArrowInterface>{

  gerarSeta(){

    if(this.props.mostrar)
      return (
        <div className={`row`}>
          <i onClick={() => {} }>
            <FontAwesomeIcon icon="arrow-left" color="#7F37D9"/>
          </i>
          <i onClick={() => {} }>
            <FontAwesomeIcon icon="arrow-right" color="#7F37D9"/>
          </i>
        </div>
      );

    else
      return <div/>
  }

  render(){

    return (
      <div className={`row arrows-container`}>
        {this.gerarSeta()}
      </div>
    );

  }


}
