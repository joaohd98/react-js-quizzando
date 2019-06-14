import * as React from 'react';
import './temas.scss';
import {Usuario} from "../../models/usuario";
import Titulo from "../../components/titulo/titulo";
import ButtonSubmit from "../../components/button-submit/button-submit";
import {Tema, TemasAtuais} from "../../models/tema";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Input, {StateInterface} from "../../components/input/input";
import {Helpers} from "../../helpers/helpers";
import LazyLoadImg from "../../components/lazy-load-img/lazy-load-img";
import {TemaProvider} from "../../providers/tema/tema-provider";
import RequestErro from "../../components/request-erro/request-erro";
import {TemaHeader} from "./tema-header/tema-header";
import {TemaFiltro} from "./tema-filtro/tema-filtro";
import {mudar_input_login} from "../../redux/actions/login-action";
import { connect } from 'react-redux';
import {filtrar_tema} from "../../redux/actions/tema-action";
import {TemaCard} from "./tema-card/tema-card";
import {TemaArrow} from "./tema-arrow/tema-arrow";
import {TemaButton} from "./tema-button/tema-button";

interface TemasInterface {
  filtro: StateInterface
}

class Temas extends React.Component<TemasInterface> {

  usuario: Usuario = Usuario.pegarUsuario();
  atual: TemasAtuais;
  temas: Array<Tema> = [];
  carregando: boolean = true;
  erro: boolean = false;

  constructor(props){

    super(props);

  }

  componentDidMount() {

    this.inicializarTema();

  }

  inicializarTema() {

    new TemaProvider().pegarTemas().then(retorno => {

      this.temas = retorno.data;
      this.temas.forEach(tema => {tema.ativo = true; tema.mostrar = true});

      this.atual = new TemasAtuais(this.temas);

      this.carregando = false;

      this.forceUpdate();

    }).catch(() => {

      this.erro = true;
      this.forceUpdate();

    });

  }


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

    this.usuario.iniciarJogo();

    this.setState({
      pagina_destino: {
        pathname: '/questoes/carregando',
        state: {
          inicio: true,
          tema: tema,
          usuario: this.usuario,
        }
      },
      push: true,
    });

  };

  render() {

    return (
      <div className="temas">
        <form onSubmit={this.selecionadoTema} method="post">
          <TemaHeader nome={this.usuario.nome}/>
          <div className={`row row-sub-header`}>
            <Titulo texto="TEMAS"/>
          </div>
          <TemaFiltro filtro={this.props.filtro} mostrar={this.temas.length > 0} />
          <TemaCard temas={this.temas} carregando={this.carregando} erro={this.erro} atual={this.atual} moverFunc={this.moverSelecionado.bind(this)}/>
          <TemaArrow mostrar={this.temas.filter(tema => tema.mostrar).length > 1}/>
          <TemaButton texto="SELECIONAR" mostrar={this.temas.length > 0} disabled={this.temas.filter(tema => tema.mostrar).length === 0}/>
        </form>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  filtro: state.temaReducer.filtro,
});

const mapDispatchToProps = dispatch => ({
  filtrar: (filtro: string) => dispatch(filtrar_tema(filtro)),
  mover: (inputField: StateInterface) => dispatch(mudar_input_login(inputField)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Temas);

