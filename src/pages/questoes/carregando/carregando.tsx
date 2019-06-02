import * as React from 'react';
import './carregando.scss';
import {Tema} from "../../../models/tema";
import {Redirect} from "react-router";
import happy from '../../../assets/imgs/happy.png';
import sad from '../../../assets/imgs/sad.png';
import ButtonSubmit from "../../../components/button-submit/button-submit";
import {Twitter} from "../../../models/twitter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Carregando extends React.Component {

  twitter: Twitter = new Twitter();

  componentDidMount() {
    window.addEventListener('resize', () => this.forceUpdate())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.forceUpdate())
  }

  erro() {

    return (
      <div className="erro">
        <div>
          <img src={happy} alt={happy}/>
          <img src={happy} alt={happy}/>
          <img src={sad} alt={sad}/>
        </div>
        <p>2 vidas</p>
        <ButtonSubmit texto="CONTINUAR"/>
      </div>
    );

  }

  sucesso() {

    let gerarRetweetsCurtidas = () => {

      let listaUsuarios: JSX.Element[] = [];
      let altura = window.innerWidth;
      let alturaMinima = 320;

      for (let i = 0; i < 9; i++) {

        if(altura > alturaMinima){
          listaUsuarios.push(
            <li>
              <img src={this.twitter.gerarFotoAleatoria(0)} alt="user"/>
            </li>
          );
        }

        alturaMinima += 70;

      }

      return listaUsuarios;

    };

    return (
      <div className="acerto">
        <p>6 questões certas</p>
        <div className="twitter-box">
          <div className="header-twitter">
            <img src={this.twitter.foto} alt={this.twitter.nome}/>
            <div>
              <span className="nome">{this.twitter.nome}</span>
              <br/>
              <span className="hashtag">{this.twitter.hashtag}</span>
            </div>
          </div>
          <div className="content-twitter">
            You are the champion of the world
          </div>
          <div className="time-twitter">
            13:37 - 1 de jun de 2019
          </div>
          <div className="footer-twitter">
            <ul>
              <li>
                <span>
                  <strong>5.756</strong>
                  Retweets
                </span>
                <span>
                  <strong>21.328</strong>
                  Curtidas
                </span>
              </li>
              {gerarRetweetsCurtidas()}
            </ul>
          </div>
          <div className="footer-button-twitter">
            <ul>
              <li>
                <FontAwesomeIcon icon="comment"/>
                5,4 mil
              </li>
              <li>
                <FontAwesomeIcon icon="retweet"/>
                11 mil
              </li>
              <li>
                <FontAwesomeIcon icon="heart"/>
                43 mil
              </li>
            </ul>
          </div>
        </div>
        <ButtonSubmit texto="CONTINUAR"/>
      </div>
    )

  }

  render() {

    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}/>;

    return (
      <div className="carregando">
        {this.sucesso()}
      </div>
    );
  }

}

export default Carregando;

