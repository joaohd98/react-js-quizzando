import * as React from "react";
import "./tema-card.scss"
import {Component} from "react";
import {Tema, TemasAtuais} from "../../../models/tema";
import RequestErro from "../../../components/request-erro/request-erro";

interface TemaCardInterface {
  erro: boolean;
  erroFunc: Function
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

//      this.props.atual.definirAtuais(this.props.temas);

      let tamanho = this.props.temas.length;

      return tamanho === 0 ? this.gerarSemCard() : this.gerarCards(this.props.temas, tamanho);

    }

  }

  gerarErro() {

    return <RequestErro func={this.props.erroFunc}/>;

  }

  gerarCarregando(){

    let lista: JSX.Element[] = [];

    lista.push(
      <div key="left" className={"card left skeleton"}/>
    );

    lista.push(
      <div key="center" className={"card card-selected skeleton"}/>
    );

    lista.push(
      <div key="right" className={"card right skeleton"} />
    );

    return lista;

  }

  gerarSemCard(){

    return (
      <div key="center" className="erro">
        Não foram encontrados temas referentes a busca.
      </div>
    );

  }

  gerarCards(temas: Tema[], tamanho: number) {

    if(tamanho > 1){

      let lista: JSX.Element[] = [];

      for(let i =  0; i < tamanho; i++){
        lista.push(
          <div key={i} className={"card"}>
            <img src={temas[i].img} alt={temas[i].texto} />
            <p>{temas[i].texto}</p>
          </div>
        )
      }

      return (

        <div className="lista-container">
          { lista }
        </div>
      );

    }

    else
      return (
          <div key="center" className={"card card-selected"}>
            <img src={temas[0].img} alt={temas[0].texto} />
            <p>{temas[0].texto}</p>
          </div>
      );

  }

  render() {

    return (
      <div className={`row selecionar-tema`}>
        { this.gerarConteudo() }
      </div>
    );

  }

}
