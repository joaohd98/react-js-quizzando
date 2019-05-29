import * as React from 'react';
import './questoes.scss';
import {Redirect} from "react-router";
import {Tema} from "../../models/tema";
import happy_mini from '../../assets/imgs/happy-mini.png';
import sad_mini from '../../assets/imgs/sad-mini.png';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Usuario} from "../../models/usuario";
import {Questao} from "../../models/questao";
import {QuestoesProvider} from "../../providers/questoesProvider";

class Questoes extends React.Component {

  tema: Tema;
  usuario: Usuario = Usuario.pegarUsuario();
  questao: Questao = new Questao();

  componentDidMount() {

    if (this.props['location'].state === undefined || this.props['location'].state.tema === undefined)
      return this.setState({pagina_destino: '/'});

    else {

      this.tema = this.props['location'].state.tema;

      new QuestoesProvider().pegarQuestao(this.questao);

      window.history.replaceState({}, '/questoes');

      this.forceUpdate();

    }

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
            <p>
              <img src={happy_mini} alt="sad-face"/>
              <img src={happy_mini} alt="sad-face"/>
              <img src={sad_mini} alt="sad-face"/>
            </p>
          </div>
          <div className={`row row-pergunta`}>
            <p>
              {this.usuario.qt_questoes + 1}) {this.questao.texto}
            </p>
          </div>
          <div className={`row row-tempo`}>
            <div className={`barra barra-total`}>
              15s
              <FontAwesomeIcon icon="clock" color="white"/>
            </div>
          </div>
          <div className={`row row-alternativas`}>
            <div className="alternativa">
              <p>PS1</p>
            </div>
            <div className="alternativa">
              <p>PS2</p>
            </div>
            <div className="alternativa">
              <p>Super Nintendo</p>
            </div>
            <div className="alternativa">
              <p>Game boy</p>
            </div>
          </div>
        </form>
      </div>
    );

  }

}

export default Questoes;
