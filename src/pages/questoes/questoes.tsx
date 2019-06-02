import * as React from 'react';
import './questoes.scss';
import {Redirect} from "react-router";
import {Tema} from "../../models/tema";
import happy_mini from '../../assets/imgs/happy-mini.png';
import sad_mini from '../../assets/imgs/sad-mini.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Usuario} from "../../models/usuario";
import {Alternativa, Questao} from "../../models/questao";
import {QuestoesProvider} from "../../providers/questoesProvider";
import {AlertProvider} from "../../providers/alertProvider";
import Header from "../../components/header/header";

export interface QuestoesInterface {
  usuario: Usuario,
  tema: Tema,
  correta?: boolean
}

class Questoes extends React.Component {

  usuario: Usuario;
  tema: Tema;
  questao: Questao;

  questoesProvider: QuestoesProvider = new QuestoesProvider();

  tempo: number = 10;
  finalizado: boolean = false;

  componentWillMount(){

    if (this.props['location'].state === undefined || this.props['location'].state.tema === undefined)
      this.setState({pagina_destino: '/'});

    else {

      if(this.props['location'].state.usuario !== undefined)
        this.usuario = this.props['location'].state.usuario;

      else
        this.usuario = Usuario.pegarUsuario();

      this.tema = this.props['location'].state.tema;

      this.questao = new Questao();
      this.questoesProvider.pegarQuestao(this.questao, this.usuario.idRespondidas);

      this.calcularTempo();

    }

  }

  componentDidMount() {

    window.history.replaceState({}, '/questoes');

  }

  gerarAlternativas(){

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

    this.questao.alternativas.map((alternativa: Alternativa, index) => {

      listaAlternativas.push(
        <div key={alternativa.texto}
             className={`alternativa ${definirClasse(alternativa)}`}
             style={{pointerEvents: pointer}}
             onClick={() => this.finalizarJogada(index)}>
          <p>{alternativa.texto}</p>
        </div>
      )

    });

    return listaAlternativas;

  }

  gerarVidas(){

    let vidasElement: Array<JSX.Element> = [];

    for(let i = 3; i > 0; i--){
      vidasElement.push(
        <img src={this.usuario.vidas >= i ? happy_mini : sad_mini} alt="sad-face"/>
      )
    }

    return vidasElement;

  }

  calcularTempo(){

    let interval = setInterval(() => {

      if(this.finalizado || this.tempo <= 0)
        clearInterval(interval);

      if(this.tempo <= 0)
        this.finalizarJogada();

      else
        this.tempo--;

      this.forceUpdate();

    }, 1000);

  }

  finalizarJogada(index = -1){

    if(index > -1) {

      this.questao.alternativas[index].selecionada = true;

    }

    setTimeout(() => {

      let correta = false;

      this.questao.alternativas.forEach((alternativa: Alternativa) => {

        if(alternativa.selecionada && alternativa.correta)
          correta = true;

      });

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

    this.finalizado = true;

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

  render() {

    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}/>;

    return (
      <div className="questoes">
        <form>
          <Header
            left={<a onClick={this.desistir.bind(this)}>Desistir</a>}
            right={this.gerarVidas()}
          />
          <div className={`row row-pergunta`}>
            <p>
              {this.questao.texto}
            </p>
          </div>
          <div className={`row row-tempo`}>
            <span>
              {this.usuario.qt_questoes + 1}˚ pergunta.
            </span>
            <span style={{color: (this.tempo <= 3 ? "var(--color-danger)" : "white")}}>
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

/*


 */
