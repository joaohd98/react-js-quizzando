import * as React from "react";
import "./tema-card.scss"
import {Tema, TemasAtuais} from "../../../../models/tema";
import Swipe from 'react-easy-swipe';
import LazyLoadImg from "../../../../components/lazy-load-img/lazy-load-img";
import {Component} from "react";
import RequestErro from "../../../../components/request-erro/request-erro";

interface TemaCardInterface {
  erro: boolean;
  carregando: boolean;
  temas: Tema[];
  atual: TemasAtuais;
  moverFunc: Function
}

export class TemaCard extends Component<TemaCardInterface>{

  gerarConteudo(){

    if(this.props.erro)
      return this.gerarErro();

    else if(this.props.carregando)
      return this.gerarCarregando();

    else {

      this.props.atual.definirAtuais(this.props.temas);

      let temas = this.props.temas.filter(tema => tema.mostrar);
      let tamanho = temas.filter(tema => tema.mostrar).length;

      return tamanho === 0 ? this.gerarSemCard() : this.gerarCards(temas, tamanho);

    }

  }

  gerarErro(){

    return <RequestErro/>;

  }

  gerarCarregando(){

    return (
      <Swipe>
        <div key="left" className={"card left skeleton"}/>
        <div key="center" className={"card card-selected skeleton"}/>
        <div key="right" className={"card right skeleton"} />
      </Swipe>
    );

  }

  gerarSemCard(){

    return (
      <div key="center" className="erro">
        Não foram encontrados temas referentes a busca.
      </div>
    );

  }

  gerarCards(temas: Tema[], tamanho: number){

    let atual = this.props.atual;
    atual.definirAtuais(this.props.temas);

    if(tamanho > 1)
      return (
        <Swipe
          onSwipeLeft={() => this.props.moverFunc("direita")}
          onSwipeRight={() => this.props.moverFunc("esquerda")}>
          <div key="left" className={"card left"}>
            <LazyLoadImg img={temas[atual.indexAnterior].img} alt={temas[atual.indexAnterior].texto} />
            <p>{temas[atual.indexAnterior].texto}</p>
          </div>
          <div key="center" className={"card card-selected"}>
            <LazyLoadImg img={temas[atual.indexAtual].img} alt={temas[atual.indexAtual].texto} />
            <p>{temas[atual.indexAtual].texto}</p>
          </div>
          <div key="right" className={"card right"}>
            <LazyLoadImg img={temas[atual.indexProximo].img} alt={temas[atual.indexProximo].texto} />
            <p>{temas[atual.indexProximo].texto}</p>
          </div>
        </Swipe>
      );

    else
      return (
        <Swipe>
          <div key="center" className={"card card-selected"}>
            <LazyLoadImg img={temas[atual.indexAtual].img} alt={temas[atual.indexAtual].texto} />
            <p>{temas[atual.indexAtual].texto}</p>
          </div>
        </Swipe>
      );

  }

  render() {

    return (
      <div className={`row selecionar-tema`}>
        {this.gerarConteudo()}
      </div>
    );

  }

}
