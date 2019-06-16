import * as React from 'react';
import './carregando.scss';
import {Usuario} from "../../models/usuario";
import {Tema} from "../../models/tema";
import {CarregandoHeader} from "./carregando-header/carregando-header";
import {CarregandoAcerto} from "./carregando-acerto/carregando-acerto";
import {CarregandoErro} from "./carregando-erro/carregando-erro";
import {CarregandoBotaoSubmit} from "./carregando-botao-submit/carregando-botao-submit";
import { connect } from 'react-redux';

interface CarregandoInterface{
  usuario: Usuario,
  tema: Tema | null,
  motivo: 'inicio' | 'perdeu' | 'acertou',
  carregando: boolean,
  erro: boolean
}

class Carregando extends React.Component<CarregandoInterface> {

  /*
  carregarPergunta(){

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

  */

  gerarConteudo(){

    if(this.props.motivo === "acertou")
     return <CarregandoAcerto/>;

    else
      return <CarregandoErro usuario={this.props.usuario} motivo={this.props.motivo}/>;

  }

  render() {

    let props = this.props;

    return (
      <div className="carregando">
        <CarregandoHeader usuario={props.usuario}/>
        { this.gerarConteudo() }
        <CarregandoBotaoSubmit usuario={props.usuario} motivo={props.motivo} erro={props.erro} carregando={props.carregando} />
      </div>
    );
  }

}

const mapStateToProps = state => ({
  usuario:    state.questoesCarregandoReducer.usuario,
  tema:       state.questoesCarregandoReducer.tema,
  motivo:     state.questoesCarregandoReducer.motivo,
  carregando: state.questoesCarregandoReducer.carregando,
  erro:       state.questoesCarregandoReducer.erro,
});


export default connect(mapStateToProps, null)(Carregando);

