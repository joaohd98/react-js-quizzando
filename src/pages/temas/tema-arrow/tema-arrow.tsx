import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './tema-arrow.scss'

interface TemaArrowInterface{
  mostrar: boolean;
  swiper: any,
}

export class TemaArrow extends React.Component<TemaArrowInterface>{

  mudarDirecao(direcao: "direita" | "esquerda"){

    if(direcao === "direita")
      this.props.swiper.slideNext();

    else
      this.props.swiper.slidePrev();

  }

  gerarSeta(){

    if(this.props.mostrar)
      return (
        <div className={`row`}>
          <i onClick={() => this.mudarDirecao('esquerda')}>
            <FontAwesomeIcon icon="arrow-left" color="#7F37D9"/>
          </i>
          <i onClick={() => this.mudarDirecao('direita')}>
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
