import * as React from 'react';
import './temas.scss';
import {Usuario} from "../../models/usuario";
import Titulo from "../../components/titulo/titulo";
import {Tema} from "../../models/tema";
import {StateInterface} from "../../components/input/input";
import {TemaHeader} from "./tema-header/tema-header";
import {TemaFiltro} from "./tema-filtro/tema-filtro";
import { connect } from 'react-redux';
import {filtrar_tema, inicializar_slide__tema, pegar_temas} from "../../redux/actions/tema-action";
import {TemaCard} from "./tema-card/tema-card";
import {TemaArrow} from "./tema-arrow/tema-arrow";
import {TemaButton} from "./tema-button/tema-button";

interface TemasInterface {
  usuario: Usuario,
  temas: Tema[],
  filtro: StateInterface,
  swiper: object,
  carregando: boolean,
  erro: boolean

  //funcoes
  carregarTemas: Function,
  filtrar: Function,
  inicializar_slide: Function,
}

class Temas extends React.Component<TemasInterface> {

  componentDidMount() {

    this.props.carregarTemas();

  }

  pegarTemasFiltrado(){

    return this.props.temas.filter(tema => tema.mostrar === undefined || tema.mostrar)

  }

  selecionarTema(e){

    e.preventDefault();

    let tema: Tema = this.pegarTemasFiltrado()[this.props.swiper['realIndex']];

    console.log(tema);

  }

  render() {

    let props = this.props;

    return (
      <div className="temas">
        <form onSubmit={(e) => this.selecionarTema(e)} method="post">
          <TemaHeader nome={props.usuario.nome}/>
          <div className={`row row-sub-header`}>
            <Titulo texto="TEMAS"/>
          </div>
          <TemaFiltro filtro={props.filtro} filtrar={props.filtrar} mostrar={props.temas.length > 0} />
          <TemaCard temas={this.pegarTemasFiltrado()} inicializar_slide={props.inicializar_slide} carregando={props.carregando} erro={props.erro} erroFunc={props.carregarTemas}/>
          <TemaArrow mostrar={props.swiper != null} swiper={props.swiper}/>
          <TemaButton texto="SELECIONAR" mostrar={props.temas.length > 0} disabled={this.pegarTemasFiltrado().length === 0}/>
        </form>
      </div>
    );

  }

}

const mapStateToProps = state => ({
  usuario: state.temaReducer.usuario,
  temas:   state.temaReducer.temas,
  filtro:  state.temaReducer.filtro,
  swiper:  state.temaReducer.swiper,
  carregando: state.temaReducer.carregando,
  erro: state.temaReducer.erro,
});

const mapDispatchToProps = dispatch => ({
  carregarTemas: () => (pegar_temas(dispatch)),
  filtrar: (filtro: string) => dispatch(filtrar_tema(filtro)),
  inicializar_slide: (swiper: object) => dispatch(inicializar_slide__tema(swiper)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Temas);

