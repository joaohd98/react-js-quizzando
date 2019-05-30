import * as React from 'react';
import './questoes.scss';
import {Redirect} from "react-router";
import {Tema} from "../../models/tema";
import happy_mini from '../../assets/imgs/happy-mini.png';
import sad_mini from '../../assets/imgs/sad-mini.png';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Usuario} from "../../models/usuario";
import {Alternativa, Questao} from "../../models/questao";
import {QuestoesProvider} from "../../providers/questoesProvider";

class Questoes extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();
  tema: Tema;
  questao: Questao = new Questao();
  questoesProvider: QuestoesProvider = new QuestoesProvider();
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

        if(alternativa.selecionada)
            return alternativa.correta ? 'alternativa-certa' : 'alternativa-errada';

        else if(alternativa.correta)
          return 'alternativa-certa';

        return '';

      };

      return (
        <div className={`row row-alternativas`}>
          {
            this.questao.alternativas.map((alternativa: Alternativa) => (
              <div key={alternativa.texto}
                   className={`alternativa ${definirClasse(alternativa)}`}>
                <p>{alternativa.texto}</p>
              </div>
            ))
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

      this.tempo--;
      this.forceUpdate();

      if(this.tempo <= 0)
        this.finalizarJogada();

    }, 1000);

  }

  finalizarJogada(index = -1){

    if(index > -1) {

      this.questao.alternativas.forEach((alternativa: Alternativa) => alternativa.selecionada = false);
      this.questao.alternativas[index].selecionada = true;

    }

    this.finalizado = true;
    this.forceUpdate();

  }

  render() {


    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}/>;

    return (
      <div className="questoes">
        <form>
          <div className={`row row-header`}>
            <p>
              <Link to={"/"}>Desistir</Link>
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
