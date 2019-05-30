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

  tema: Tema;
  usuario: Usuario = Usuario.pegarUsuario();
  questao: Questao = new Questao();
  questoesProvider: QuestoesProvider = new QuestoesProvider();
  tempo: number = 15;

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

    let selecionarResposta = (id: number) => {

      this.questao.alternativas.forEach(
        (alternativa: Alternativa, index: number) => alternativa.selecionada = index === id);

      this.forceUpdate();

    };

    return (
      <div className={`row row-alternativas`}>
        {
          this.questao.alternativas.map((alternativa: Alternativa, index) => (
            <div key={alternativa.texto}
                 className={`alternativa ${alternativa.selecionada ? 'alternativa-selecionada' : '' }`}
                 onClick={() => selecionarResposta(index)}>
              <p>{alternativa.texto}</p>
            </div>
          ))
        }
      </div>
    );

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

      if(this.tempo <= 0)
        clearInterval(interval);

      this.tempo--;

      this.forceUpdate();

      if(this.tempo <= 0)
        clearInterval(interval);

    }, 1000);



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
            <div className={`barra barra-restante`} />
            <div className={`barra barra-total`} />
            <span>
              {this.tempo + "s"}
              <FontAwesomeIcon icon="clock" color="white"/>
            </span>
            </div>
          { this.gerarAlternativas() }
        </form>
      </div>
    );

  }

}

export default Questoes;
