import * as React from 'react';
import './questoes.scss';
import {Redirect} from "react-router";
import {Tema} from "../../models/tema";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Usuario} from "../../models/usuario";
import {Alternativa, Questao} from "../../models/questao";
import {AlertProvider} from "../../providers/alert-provider";
import Header from "../../components/header/header";
import {PerguntaProvider} from "../../providers/pergunta/pergunta-provider";

export interface QuestoesInterface {
  usuario: Usuario,
  tema: Tema,
  questao?: Questao,
  correta?: boolean,
  inicio?: boolean
}

class Questoes extends React.Component {

  usuario: Usuario;
  tema: Tema;
  questao: Questao;

  tempo: number = 20;

  finalizado: boolean = false;
  carregando: boolean = false;

  componentWillMount(){

    if (this.props['location'].state === undefined || this.props['location'].state.tema === undefined)
      this.setState({ pagina_destino: '/' });

    else {

      this.usuario = this.props['location'].state.usuario;
      this.tema    = this.props['location'].state.tema;
      this.questao = this.props['location'].state.questao;

      this.calcularTempo();

    }

  }

  componentDidMount() {

    window.history.replaceState({}, '/questoes');

  }

  gerarAlternativas(){

    if(this.carregando)
      return (
        <div className="carregando">
          <FontAwesomeIcon icon="spinner"/>
          <p>Carregando...</p>
        </div>
      );

    else{

      let definirClasse = (alternativa: Alternativa) => {

        if(this.finalizado){

          if(alternativa.selecionada) {

            if(alternativa.correta)
              return 'alternativa-certa';

            else
              return 'alternativa-errada';

          }

          else if(alternativa.correta)
            return 'alternativa-certa';

          return '';

        }

        else
          return alternativa.selecionada ? 'alternativa-selecionada' : ''

      };

      let listaAlternativas: Array<JSX.Element> = [];
      let pointer: "none" | "auto" = this.finalizado ? "none" : "auto";

      this.questao.alternativas.forEach((alternativa: Alternativa, index) => {

        listaAlternativas.push(
          <div key={alternativa.texto}
               className={`alternativa ${definirClasse(alternativa)}`}
               style={{pointerEvents: pointer}}
               onClick={() => this.finalizarJogada(index)}>
            <p>{alternativa.texto}</p>
          </div>
        );

      });

      return listaAlternativas;

    }


  }

  gerarVidas(){

    let vidasElement: Array<JSX.Element> = [];

    for(let i = 3; i > 0; i--){
      vidasElement.unshift(
        <FontAwesomeIcon key={i} icon={this.usuario.vidas >= i ? 'heart' : 'skull-crossbones'} />
      )
    }

    return vidasElement;

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

  calcularTempo(){

    let interval = setInterval(() => {

      this.tempo--;

      if(this.finalizado || this.tempo <= 0)
        clearInterval(interval);

      if(this.tempo <= 0)
        this.finalizarJogada();

      else
        this.forceUpdate();

    }, 1000);

  }

  finalizarJogada(index = -1){

    let selecionado = false;

    if(index > -1) {

      this.questao.alternativas[index].selecionada = true;
      selecionado = true;

    }

    this.finalizado = true;
    this.carregando = true;

    this.forceUpdate();

    new PerguntaProvider().verificarRespostaCerta(this.questao.id).then(retorno => {

      let id_correta: number = retorno.data;
      let correta = false;

      this.questao.alternativas.forEach((alternativa: Alternativa) => {

        alternativa.correta = alternativa.id === id_correta;

        if(alternativa.selecionada && alternativa.correta)
          correta = true;

      });

      this.carregando = false;

      setTimeout(() => {

        this.forceUpdate();

      }, selecionado ? 1000 : 0);

      setTimeout(() => {

        if(correta)
          this.usuario.pontuar();

        else
          this.usuario.perderVida();

        let questoesInterface: QuestoesInterface = {
          usuario: this.usuario,
          tema: this.tema,
          correta: correta
        };

        this.setState({
          pagina_destino: {
            pathname: '/questoes/carregando',
            state: questoesInterface
          },
          push: false,
        });

      }, 2500);

    }, () => {

      let alertProvider = new AlertProvider();

      alertProvider.erro_questao_responder();

      let questoesInterface: QuestoesInterface = {
        usuario: this.usuario,
        tema: this.tema,
        correta: false
      };

      this.setState({
        pagina_destino: {
          pathname: '/questoes/carregando',
          state: questoesInterface
        },
        push: false,
      });

    });


  }

  render() {

    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}/>;

    return (
      <div className="questoes">
        <form>
          <Header
            left={<span className="span-link" onClick={this.desistir.bind(this)}>Desistir</span>}
            right={this.gerarVidas()}
          />
          <div className={`row row-pergunta`}>
            <p>
              {this.questao.texto}
            </p>
          </div>
          <div className={`row row-tempo`}>
            <span>
              Pontuação: {this.usuario.qt_questoes}
            </span>
            <span style={{color: (this.tempo <= 3 ? "red" : "white")}}>
              {this.tempo + "s"}
              <FontAwesomeIcon icon="clock" />
            </span>
          </div>
          <div className={`row row-alternativas`}>
            { this.gerarAlternativas() }
          </div>
        </form>
      </div>
    );

  }

}

export default Questoes;
