import * as React from 'react';
import './carregando.scss';
import {Redirect} from "react-router";
import happy from '../../../assets/imgs/happy.png';
import sad from '../../../assets/imgs/sad.png';
import ButtonSubmit from "../../../components/button-submit/button-submit";
import {Twitter} from "../../../models/twitter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Usuario} from "../../../models/usuario";
import {Tema} from "../../../models/tema";
import {Questao} from "../../../models/questao";
import {QuestoesInterface} from "../questoes";

class Carregando extends React.Component {

  usuario: Usuario;
  tema: Tema;
  correta: boolean;
  twitter: Twitter = new Twitter();

  componentWillMount() {

    if (this.props['location'].state === undefined || this.props['location'].state.tema === undefined)
      this.setState({pagina_destino: '/'});

    else {

      this.usuario = this.props['location'].state.usuario;
      this.tema    = this.props['location'].state.tema;
      this.correta = this.props['location'].state.correta;

    }


  }

  componentDidMount() {

    window.history.replaceState({}, '/questoes/carregando');
    window.addEventListener('resize', () => this.forceUpdate())

  }

  componentWillUnmount() {

    window.removeEventListener('resize', () => this.forceUpdate())

  }

  erro() {

    return (
      <div className="erro">
        <div>
          <img src={this.usuario.vidas >= 1 ? happy : sad} alt='estrela'/>
          <img src={this.usuario.vidas >= 2 ? happy : sad} alt='estrela' />
          <img src={this.usuario.vidas >= 3 ? happy : sad} alt='estrela' />
        </div>
        <p>
          {this.usuario.vidas > 0 ? `${this.usuario.vidas} vidas` : "BOM JOGO" }
        </p>
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
              <img src={this.twitter.gerarFotoAleatoria(i)} alt="user"/>
            </li>
          );
        }

        alturaMinima += 60;

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
      </div>
    )

  }

  irParaQuestao = () =>{

    let questoesInterface: QuestoesInterface = {
      usuario: this.usuario,
      tema: this.tema,
    };

    let pathname = (this.usuario.vidas == 0) ? "/ranking" : "/questoes";

    this.setState({
      pagina_destino: {
        pathname: pathname,
        state: questoesInterface
      },
      push: false,
    });

  };

  render() {

    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}/>;

    return (
      <div className="carregando">
        { this.correta ? this.sucesso() : this.erro() }
        <ButtonSubmit texto="CONTINUAR" func={this.irParaQuestao}/>
      </div>
    );
  }

}

export default Carregando;

