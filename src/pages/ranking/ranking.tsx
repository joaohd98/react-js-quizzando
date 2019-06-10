import * as React from 'react';
import './ranking.scss';
import {Redirect} from "react-router";
import Titulo from "../../components/titulo/titulo";
import ButtonSubmit from "../../components/button-submit/button-submit";
import {RankingProvider} from "../../providers/ranking/ranking-provider";
import {Tema} from "../../models/tema";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RequestErro from "../../components/request-erro/request-erro";
import {RankingModel} from "../../models/ranking-model";

class Ranking extends React.Component {

  ranking: RankingModel[];
  tema: Tema;
  id_ranking: number;
  refPosicaoRanking: React.RefObject<any>;

  carregando: boolean = true;
  erro_pagina: boolean = false;

  componentWillMount() {

    this.tema = this.props['location'].state.tema;
    this.id_ranking = this.props['location'].state.id_ranking;

    this.refPosicaoRanking = React.createRef();

    this.pegarRanking();

  }

  componentDidUpdate(){

    if(this.refPosicaoRanking.current)
      this.refPosicaoRanking.current.scrollIntoView();

  }

  pegarRanking(){

    this.carregando = true;
    this.erro_pagina = false;

    this.forceUpdate();

    new RankingProvider().verRanking(this.tema.id).then(retorno => {

      this.ranking = retorno.data;

      this.carregando = false;
      this.forceUpdate();

    }, () => {

      this.erro_pagina = true;
      this.forceUpdate();

    })

  }

  gerarTabela(){

    if(this.erro_pagina)
      return <RequestErro texto="Não foi possível buscar o raking." func={this.pegarRanking.bind(this)}/>;

    else if(this.carregando)
      return (
        <div className="carregando">
          <FontAwesomeIcon icon="spinner"/>
          <p>Carregando...</p>
        </div>
      );

    else
      return (
        <table>
          <thead>
          <tr>
            <th>˚</th>
            <th>Nome</th>
            <th>Pontos</th>
          </tr>
          </thead>
          <tbody>
            { this.gerarLinhasTabela() }
          </tbody>
        </table>
      )

  }

  gerarLinhasTabela(){

    let list: JSX.Element[] = [];

    this.ranking.forEach( (ranking_linha: RankingModel, index: number) => {
      list.push(
        <tr key={index} ref={this.id_ranking === ranking_linha.id ? this.refPosicaoRanking : ''} className={this.id_ranking === ranking_linha.id ? "usuario" : ""}>
          <td>{index + 1}</td>
          <td>{ranking_linha.nome}</td>
          <td>{ranking_linha.qt_questoes}</td>
        </tr>
      )
    });

    return list;
  }

  irParaTemas(){

    this.setState({
      pagina_destino: '/',
      push: true,
    });

  };

  render() {

    if(this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}/>;

    return (
      <div className="ranking">
        <div className="titulo-tema">
          <Titulo texto={this.tema.texto}/>
        </div>
        <div className="tabela-container">
          { this.gerarTabela() }
        </div>
        <div className="button-jogaer-novamente">
          <ButtonSubmit texto="JOGAR NOVAMENTE" func={this.irParaTemas.bind(this)} />
        </div>
      </div>
    );

  }

}

export default Ranking;
