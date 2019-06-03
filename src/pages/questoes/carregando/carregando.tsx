import * as React from 'react';
import './carregando.scss';
import {Redirect} from "react-router";
import ButtonSubmit from "../../../components/button-submit/button-submit";
import {Twitter} from "../../../models/twitter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Usuario} from "../../../models/usuario";
import {Tema} from "../../../models/tema";
import {QuestoesInterface} from "../questoes";
import Header from "../../../components/header/header";
import {AlertProvider} from "../../../providers/alert-provider";
import LazyLoadImg from "../../../components/lazy-load-img/lazy-load-img";
import happy from '../../../assets/imgs/happy.png';
import sad from '../../../assets/imgs/sad.png';
import {Helpers} from "../../../helpers/helpers";

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
          <LazyLoadImg img={this.usuario.vidas >= 1 ? happy : sad} alt='estrela'/>
          <LazyLoadImg img={this.usuario.vidas >= 2 ? happy : sad} alt='estrela' />
          <LazyLoadImg img={this.usuario.vidas >= 3 ? happy : sad} alt='estrela' />
        </div>
        <p>
          {this.usuario.vidas > 0 ? `${this.usuario.vidas} vida${this.usuario.vidas > 1 ? 's' : ''}` : "BOM JOGO" }
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
            <li key={i}>
              <img src={this.twitter.gerarFotoAleatoria(i)} alt={"user"} />
            </li>
          );
        }

        else
          break;

        alturaMinima += 60;

      }

      return listaUsuarios;

    };

    return (
      <div className="acerto">
        <div className="twitter-box">
          <div className="header-twitter">
            <LazyLoadImg img={this.twitter.foto} alt={this.twitter.nome} />
            <div>
              <span className="nome">{this.twitter.nome}</span>
              <br/>
              <span className="hashtag">{this.twitter.hashtag}</span>
            </div>
          </div>
          <div className="content-twitter">
            {this.twitter.mensagem}
          </div>
          <div className="time-twitter">
            {this.twitter.dataFormatada}
          </div>
          <div className="footer-twitter">
            <ul>
              <li>
                <span>
                  <strong>{Helpers.formatarPonto(this.twitter.qtRetweets)}</strong>
                  Retweets
                </span>
                <span>
                  <strong>{Helpers.formatarPonto(this.twitter.qtCurtidas)}</strong>
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
                <strong>{Helpers.pegarPrimeirosDigitos(this.twitter.qtComentarios)}</strong> mil
              </li>
              <li>
                <FontAwesomeIcon icon="retweet"/>
                <strong>{Helpers.pegarPrimeirosDigitos(this.twitter.qtRetweets)}</strong> mil
              </li>
              <li>
                <FontAwesomeIcon icon="heart"/>
                <strong>{Helpers.pegarPrimeirosDigitos(this.twitter.qtCurtidas)}</strong> mil
              </li>
            </ul>
          </div>
        </div>
      </div>
    )

  }

  irParaQuestao() {

    let questoesInterface: QuestoesInterface = {
      usuario: this.usuario,
      tema: this.tema,
    };

    let pathname = (this.usuario.vidas === 0) ? "/ranking" : "/questoes";

    this.setState({
      pagina_destino: {
        pathname: pathname,
        state: questoesInterface
      },
      push: false,
    });

  };

  desistir() {

    let alertProvider: AlertProvider = new AlertProvider();

    alertProvider.desistir(() => {

      this.setState({
        pagina_destino: `/`,
        push: false,
        state: {
          desistir: true,
        }
      })

    });
  };

  render() {

    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}/>;

    return (
      <div className="carregando">
        <Header
          left={<span className="span-link" onClick={this.desistir.bind(this)}>Desistir</span>}
          right={`Pontuação: ${this.usuario.qt_questoes}`}
        />
        { this.correta ? this.sucesso() : this.erro() }
        <ButtonSubmit texto="CONTINUAR" func={this.irParaQuestao.bind(this)}/>
      </div>
    );
  }

}

export default Carregando;

