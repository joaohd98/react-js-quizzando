import * as React from 'react';
import './temas.scss';
import {Usuario} from "../../models/usuario";
import {Redirect} from "react-router";
import Titulo from "../../components/titulo/titulo";
import ButtonSubmit from "../../components/button-submit/button-submit";
import {Tema, TemasAtuais} from "../../models/tema";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Input, {StateInterface} from "../../components/input/input";
import {Helpers} from "../../helpers/helpers";
import {AlertProvider} from "../../providers/alert-provider";
import Header from "../../components/header/header";
import {TemaProvider} from "../../providers/tema/tema-provider";
import {TemaCard} from "./componentes/tema-card/tema-card";

class Temas extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();
  atual: TemasAtuais;
  temas: Array<Tema> = [];
  carregando: boolean = true;
  erro: boolean = false;

  constructor(props){

    super(props);

    let filtro: StateInterface = {};

    this.state = {
      filtro: filtro
    };

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

  sair = () => {

    let alert: AlertProvider = new AlertProvider();

    alert.sair(() => {

      Usuario.sair();

      this.setState({
        'pagina_destino': "/login"
      });

    });

  };

  mostrarArrow = () => {

    return (
      this.temas.filter(tema => tema.mostrar).length > 1 ?
        <div className={`row`}>
          <i onClick={() => this.moverSelecionado("esquerda")}>
            <FontAwesomeIcon icon="arrow-left" color="#7F37D9"/>
          </i>
          <i onClick={() => this.moverSelecionado("direita")}>
            <FontAwesomeIcon icon="arrow-right" color="#7F37D9"/>
          </i>
        </div>
        : ''
    )

  };

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

      if (valor)
        tema.mostrar = Helpers.removerAcentosMinusculo(tema.texto).includes(Helpers.removerAcentosMinusculo(valor));

      else
        tema.mostrar = true;

      if(tema.mostrar) {

        tema.ativo = primeiro;
        primeiro = false;

      }

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

    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}   />;

    return (
      <div className="temas">
        <form onSubmit={this.selecionadoTema} method="post">
          <Header
            left={`Olá, ${this.usuario.nome}`}
            right={<span className="span-link" onClick={this.sair}><FontAwesomeIcon icon="sign-out-alt" color="white"/>Sair</span>}/>
          <div className={`row row-sub-header`}>
            <Titulo texto="TEMAS"/>
          </div>
          <div className={`row row-filtro`}>
            {
              this.temas.length ?
                <Input nome="filtro" placeholder="Pesquise pelo seu tema..." funcState={this.setState.bind(this)}
                       onChangeFunc={this.filtrar.bind(this)} state={this.state}/>
                : ''
            }
          </div>
          <TemaCard temas={this.temas} carregando={this.carregando} erro={this.erro} atual={this.atual} moverFunc={this.moverSelecionado.bind(this)}/>
          <div className={`arrows-container`}>
          { this.mostrarArrow() }
          </div>
          <div className="row-button">
            {
              this.temas.length ?
                <ButtonSubmit texto="Selecionar" disabled={this.temas.filter(tema => tema.mostrar).length === 0}/>
                : ''
            }
          </div>
        </form>
      </div>
    );
  }

}

export default Temas;
