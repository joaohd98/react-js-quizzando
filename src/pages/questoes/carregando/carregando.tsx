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
import twitter from '../../../assets/icons/twitter.svg';
import {Helpers} from "../../../helpers/helpers";
import {PerguntaProvider} from "../../../providers/pergunta/pergunta-provider";
import RequestErro from "../../../components/request-erro/request-erro";
import {Questao} from "../../../models/questao";
import {RankingProvider, RankingRequestInterace} from "../../../providers/ranking/ranking-provider";

class Carregando extends React.Component {

  usuario: Usuario;
  tema: Tema;
  questao: Questao;
  correta: boolean;
  inicio: boolean;
  id_ranking: number;
  twitter: Twitter = new Twitter();

  carregando: boolean = false;
  erroPagina: boolean = false;

  componentWillMount() {

    if (this.props['location'].state === undefined || this.props['location'].state.tema === undefined)
      this.setState({pagina_destino: '/'});

    else {

      this.usuario = this.props['location'].state.usuario;
      this.tema    = this.props['location'].state.tema;

      if(this.props['location'].state.inicio)
        this.inicio = true;

      else
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

  carregarPergunta(){

    this.carregando = true;
    this.erroPagina = false;

    this.forceUpdate();

    let perguntaProvider: PerguntaProvider = new PerguntaProvider();

    perguntaProvider.pegarPergunta(this.tema.id, this.usuario.id_respondidas).then((retorno) => {

      //this.questao = retorno.data;

      this.usuario.adicionarRespondida(this.questao.id);

      let questoesInterface: QuestoesInterface = {
        usuario: this.usuario,
        tema: this.tema,
        questao: this.questao
      };

      this.setState({
        pagina_destino: {
          pathname: "/questoes",
          state: questoesInterface
        },
        push: false,
      });

    }).catch(() => {

      this.erroPagina = true;
      this.forceUpdate();

    });

  }

  adicionarRanking(){

    this.carregando = true;
    this.erroPagina = false;

    this.forceUpdate();

    let request: RankingRequestInterace = {
      id_tema: this.tema.id,
      nome: this.usuario.nome,
      qt_questoes: this.usuario.qt_questoes
    };

    new RankingProvider().adicionarRanking(request).then(retorno => {

      //this.id_ranking = retorno.data;

      this.setState({
        pagina_destino: {
          pathname: "/ranking",
          state: {
            id_ranking: this.id_ranking,
            tema: this.tema
          }
        },
        push: false,
      });

    }, () => {

      this.erroPagina = true;
      this.forceUpdate();

    });

  }

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

  erro() {

    return (
      <div className="erro">
        <div>
          <FontAwesomeIcon icon={this.usuario.vidas >= 1 ? 'heart' : 'skull-crossbones'} />
          <FontAwesomeIcon icon={this.usuario.vidas >= 2 ? 'heart' : 'skull-crossbones'} />
          <FontAwesomeIcon icon={this.usuario.vidas >= 3 ? 'heart' : 'skull-crossbones'} />
        </div>
        <p>
          {
            this.inicio ? "BOA SORTE!"
              : this.usuario.vidas > 0 ? `${this.usuario.vidas} vida${this.usuario.vidas > 1 ? 's' : ''}`
              : "BOM JOGO!"
          }
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
            <img src={this.twitter.foto} alt={this.twitter.nome} className="perfil"/>
            <div>
              <span className="nome">{this.twitter.nome}</span>
              <br/>
              <span className="hashtag">{this.twitter.hashtag}</span>
            </div>
            <img src={twitter}  alt="twitter"/>
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

  continuar(){

    this.usuario = this.props['location'].state.usuario;
    this.tema    = this.props['location'].state.tema;

    if(this.props['location'].state.inicio)
      this.inicio = true;

    else
      this.correta = this.props['location'].state.correta;

    if(this.erroPagina)
      return <RequestErro texto="Não foi possível buscar pergunta." func={this.usuario.vidas > 0 ? this.carregarPergunta.bind(this) : this.adicionarRanking.bind(this)}/>;

    else if(this.carregando)
      return (
        <div>
          <FontAwesomeIcon icon="spinner"/>
          <p>Carregando...</p>
        </div>
      );

    else
      return <ButtonSubmit texto={this.inicio ? "INICIAR" : this.usuario.vidas > 0 ? "CONTINUAR" : "Ranking"} func={this.usuario.vidas === 0 ? this.adicionarRanking.bind(this) :this.carregarPergunta.bind(this)}/>;

  }

  render() {

    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}/>;

    return (
      <div className="carregando">
        <Header
          left={<span className="span-link" onClick={this.desistir.bind(this)}>Desistir</span>}
          right={`Pontuação: ${this.usuario.qt_questoes}`}
        />
        { this.inicio ? this.erro() : this.correta ? this.sucesso() : this.erro() }
        <div className="continuar-button">
          { this.continuar() }
        </div>
      </div>
    );
  }

}

export default Carregando;

