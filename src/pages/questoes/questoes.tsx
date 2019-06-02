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

class Questoes extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();
  tema: Tema;
  questao: Questao = new Questao();

  questoesProvider: QuestoesProvider = new QuestoesProvider();
  alertProvider: AlertProvider = new AlertProvider();

  tempo: number = 10;
  finalizado: boolean = false;

  componentWillMount(){

    if (this.props['location'].state === undefined || this.props['location'].state.tema === undefined)
      this.setState({pagina_destino: '/'});

    else {

      this.tema = this.props['location'].state.tema;

      this.questoesProvider.pegarQuestao(this.questao);

      this.calcularTempo();

    }

  }

  componentDidMount() {

    window.history.replaceState({}, '/questoes');

  }

  gerarAlternativas(){

    if(!this.finalizado){

      return (
        <div className={`row row-alternativas`}>
          {
            this.questao.alternativas.map((alternativa: Alternativa, index) => (
              <div key={alternativa.texto}
                   className={`alternativa ${alternativa.selecionada ? 'alternativa-selecionada' : '' }`}
                   onClick={() => this.finalizarJogada(index)}>
                <p>{alternativa.texto}</p>
              </div>
            ))
          }
        </div>
      );

    }

    else{

      let definirClasse = (alternativa: Alternativa) => {

        if(alternativa.selecionada) {

         if(alternativa.correta)
           return 'alternativa-certa';

         else
           return 'alternativa-errada';

        }

        else if(alternativa.correta)
          return 'alternativa-certa';

        return '';

      };

      return (
        <div className={`row row-alternativas`}>
          {
            this.questao.alternativas.map((alternativa: Alternativa) => {

              return (
                <div key={alternativa.texto}
                     className={`alternativa ${definirClasse(alternativa)}`}>
                  <p>{alternativa.texto}</p>
                </div>
              )

            })
          }
        </div>

      );

    }

  }

  gerarVidas(){

    return(
      <p>
        <img src={happy_mini} alt="sad-face"/>
        <img src={this.usuario.vidas >= 2 ? happy_mini : sad_mini} alt="sad-face"/>
        <img src={this.usuario.vidas === 3 ? happy_mini : sad_mini} alt="sad-face"/>
      </p>
    )
  }

  calcularTempo(){

    let interval = setInterval(() => {

      if(this.finalizado)
        clearInterval(interval);

      else if(this.tempo <= 0)
        this.finalizarJogada();

      this.tempo--;
      this.forceUpdate();

    }, 1000);

  }

  finalizarJogada(index = -1){

    if(index > -1) {

      this.questao.alternativas.forEach((alternativa: Alternativa) => alternativa.selecionada = false);
      this.questao.alternativas[index].selecionada = true;

    }

    setTimeout(() => {

      this.setState({
        'pagina_destino': `/questoes/carregando`,
        'state': {
        }
      });

    }, 2500);

    this.finalizado = true;

  }

  desistir = () =>{

    this.alertProvider.desistir(() => {

      this.setState({
        pagina_destino: `/`,
        push: false,
        state: {
          desistir: true,
        }
      });

    });

  };

  render() {

    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}/>;

    return (
      <div className="questoes">
        <form>
          <div className={`row row-header`}>
            <p onClick={this.desistir}>
              Desistir
            </p>
            {this.gerarVidas()}
          </div>
          <div className={`row row-pergunta`}>
            <p>
              {this.usuario.qt_questoes + 1}) {this.questao.texto}
            </p>
          </div>
          <div className={`row row-tempo`}>
            <span style={{color: (this.tempo <= 3 ? "var(--color-danger)" : "white")}}>
              {this.tempo + "s"}
              <FontAwesomeIcon icon="clock" />
            </span>
          </div>
          { this.gerarAlternativas() }
        </form>
      </div>
    );

  }

}

export default Questoes;
