import * as React from 'react';
import './ranking.scss';
import {Redirect} from "react-router";
import Titulo from "../../components/titulo/titulo";
import ButtonSubmit from "../../components/button-submit/button-submit";

class Ranking extends React.Component {

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
        <Titulo texto="Quadrinhos"/>
        <table>
          <thead>
            <tr>
              <th>˚</th>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>Peter Parker o nme</td>
            <td>100</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Lois</td>
            <td>150</td>
          </tr>
          <tr className="usuario">
            <td>3</td>
            <td>Joe</td>
            <td>300</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Cleveland</td>
            <td>250</td>
          </tr>
          </tbody>
        </table>
        <ButtonSubmit texto="JOGAR NOVAMENTE" func={this.irParaTemas.bind(this)} />
      </div>
    );

  }

}

export default Ranking;
