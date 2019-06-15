import * as React from 'react';
import './temas.scss';
import {Usuario} from "../../models/usuario";
import Titulo from "../../components/titulo/titulo";
import {Tema, TemasAtuais} from "../../models/tema";
import {StateInterface} from "../../components/input/input";
import {TemaHeader} from "./tema-header/tema-header";
import {TemaFiltro} from "./tema-filtro/tema-filtro";
import { connect } from 'react-redux';
import { pegar_temas} from "../../redux/actions/tema-action";
import {TemaCard} from "./tema-card/tema-card";
import {TemaArrow} from "./tema-arrow/tema-arrow";
import {TemaButton} from "./tema-button/tema-button";

interface TemasInterface {
  usuario: Usuario,
  temas: Tema[],
  filtro: StateInterface,
  carregando: boolean,
  erro: boolean

  //funcoes
  carregarTemas: Function
}

class Temas extends React.Component<TemasInterface> {

  atual: TemasAtuais;

  componentDidMount() {

    this.props.carregarTemas();

  }

  /*
  moverSelecionado(direcao: "esquerda" | "direita") {

    let novoIndex = direcao === "esquerda" ? this.atual.indexAnterior : this.atual.indexProximo;
    let indexMostrar = 0;

    this.temas.forEach(tema => {

      if(tema.mostrar){

        if(indexMostrar === novoIndex)
          tema.ativo = true;

        else if(indexMostrar === this.atual.indexAtual)
          tema.ativo = false;

        indexMostrar++;

      }

    });

    this.forceUpdate();

  }

  filtrar(valor: string) {

    let primeiro = true;

    this.temas.forEach((tema: Tema) => {

      if (valor) {

        tema.mostrar = Helpers.removerAcentosMinusculo(tema.texto).includes(Helpers.removerAcentosMinusculo(valor));

        if (tema.mostrar && primeiro) {

          tema.ativo = true;
          primeiro = false;

        }

        else
          tema.ativo = false;

      }

      else
        tema.mostrar = true;

    });


  }

  selecionadoTema = (e) => {

    e.preventDefault();

    let tema = this.temas.filter(tema => tema.mostrar)[this.atual.indexAtual];

    this.props.usuario.iniciarJogo();

    this.setState({
      pagina_destino: {
        pathname: '/questoes/carregando',
        state: {
          inicio: true,
          tema: tema,
          usuario: this.props.usuario,
        }
      },
      push: true,
    });

  };
  */

  render() {

    let props = this.props;

    return (
      <div className="temas">
        <form onSubmit={() => {}} method="post">
          <TemaHeader nome={props.usuario.nome}/>
          <div className={`row row-sub-header`}>
            <Titulo texto="TEMAS"/>
          </div>
          <TemaFiltro filtro={props.filtro} mostrar={props.temas.length > 0} />
          <TemaCard temas={props.temas} carregando={props.carregando} erro={props.erro} erroFunc={props.carregarTemas} atual={this.atual} moverFunc={() => {} /*this.moverSelecionado.bind(this) */}/>
          <TemaArrow mostrar={props.temas.length > 0}/>
          <TemaButton texto="SELECIONAR" mostrar={props.temas.length > 0} disabled={false}/>
        </form>
      </div>
    );

  }

}

const mapStateToProps = state => ({
  usuario: state.temaReducer.usuario,
  temas:   state.temaReducer.temas,
  filtro:  state.temaReducer.filtro,
  carregando: state.temaReducer.carregando,
  erro: state.temaReducer.erro,
});

const mapDispatchToProps = dispatch => ({
  carregarTemas: () => (pegar_temas(dispatch)),
  //filtrar: (filtro: string) => dispatch(filtrar_tema(filtro)),
  ///mover: (inputField: StateInterface) => dispatch(mudar_input_login(inputField)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Temas);

