import * as React from "react";
import "./carregando-acerto.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Twitter} from "../../../models/twitter";
import {Helpers} from "../../../helpers/helpers";
import twitter_logo from '../../../assets/icons/twitter.svg';

export class CarregandoAcerto extends React.Component {

  componentDidMount() {

    window.addEventListener('resize', () => this.forceUpdate())

  }

  componentWillUnmount() {

    window.removeEventListener('resize', () => this.forceUpdate())

  }

  gerarRetweetsCurtidas(){

    let twitter = new Twitter();

    let listaUsuarios: JSX.Element[] = [];
    let altura = window.innerWidth;
    let alturaMinima = 320;

    for (let i = 0; i < 9; i++) {

      if(altura > alturaMinima){
        listaUsuarios.push(
          <li key={i}>
            <img src={twitter.gerarFotoAleatoria(i)} alt={"user"} />
          </li>
        );
      }

      else
        break;

      alturaMinima += 60;

    }

    return listaUsuarios;
    
  }

  render() {

    let twitter = new Twitter();
    
    return (
      <div className="acerto">
        <div className="twitter-box">
          <div className="header-twitter">
            <img src={twitter.foto} alt={twitter.nome} className="perfil"/>
            <div>
              <span className="nome">{twitter.nome}</span>
              <br/>
              <span className="hashtag">{twitter.hashtag}</span>
            </div>
            <img src={twitter_logo}  alt="twitter"/>
          </div>
          <div className="content-twitter">
            {twitter.mensagem}
          </div>
          <div className="time-twitter">
            {twitter.dataFormatada}
          </div>
          <div className="footer-twitter">
            <ul>
              <li>
                <span>
                  <strong>{Helpers.formatarPonto(twitter.qtRetweets)}</strong>
                  Retweets
                </span>
                <span>
                  <strong>{Helpers.formatarPonto(twitter.qtCurtidas)}</strong>
                  Curtidas
                </span>
              </li>
              { this.gerarRetweetsCurtidas() }
            </ul>
          </div>
          <div className="footer-button-twitter">
            <ul>
              <li>
                <FontAwesomeIcon icon="comment"/>
                <strong>{Helpers.pegarPrimeirosDigitos(twitter.qtComentarios)}</strong> mil
              </li>
              <li>
                <FontAwesomeIcon icon="retweet"/>
                <strong>{Helpers.pegarPrimeirosDigitos(twitter.qtRetweets)}</strong> mil
              </li>
              <li>
                <FontAwesomeIcon icon="heart"/>
                <strong>{Helpers.pegarPrimeirosDigitos(twitter.qtCurtidas)}</strong> mil
              </li>
            </ul>
          </div>
        </div>
      </div>
    );

  }

}
