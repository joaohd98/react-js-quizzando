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
import LazyLoadImg from "../../components/lazy-load-img/lazy-load-img";
import {TemaProvider} from "../../providers/tema/tema-provider";

class Temas extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();
  atual: TemasAtuais;
  temas: Array<Tema> = [];
  carregando: boolean = true;

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

    }).catch(e => {

      console.log(e);

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

  mostrarTemas = () => {

    let lista: Array<JSX.Element> = [];

    if(this.carregando){

      lista.push(
        <div key="left" className={"card left skeleton"}/>
      );

      lista.push(
        <div key="center" className={"card card-selected skeleton"}/>
      );

      lista.push(
        <div key="right" className={"card right skeleton"} />
      );

      return lista;

    }

    let temas = this.temas.filter(tema => tema.mostrar);
    let tamanho = temas.filter(tema => tema.mostrar).length;

    if (tamanho > 1) {

      lista.push(
        <div key="left" className={"card left"} onClick={() => this.moverSelecionado("esquerda")}>
          <LazyLoadImg img={temas[this.atual.indexAnterior].img} alt={temas[this.atual.indexAnterior].texto} />
          <p>{temas[this.atual.indexAnterior].texto}</p>
        </div>
      );

      lista.push(
        <div key="center" className={"card card-selected"}>
          <LazyLoadImg img={temas[this.atual.indexAtual].img} alt={temas[this.atual.indexAtual].texto} />
          <p>{temas[this.atual.indexAtual].texto}</p>
        </div>
      );

      lista.push(
        <div key="right" className={"card right"} onClick={() => this.moverSelecionado("direita")}>
          <LazyLoadImg img={temas[this.atual.indexProximo].img} alt={temas[this.atual.indexProximo].texto} />
          <p>{temas[this.atual.indexProximo].texto}</p>
        </div>
      );

    }

    else if (tamanho === 1) {

      lista.push(
        <div key="center" className={"card card-selected"}>
          <LazyLoadImg img={temas[this.atual.indexAtual].img} alt={temas[this.atual.indexAtual].texto} />
          <p>{temas[this.atual.indexAtual].texto}</p>
        </div>
      );

    }

    else {

      lista.push(
        <div key="center" className={"card card-selected"}>
          <p className="sem-temas">Não foram encontrados temas referentes a busca.</p>
        </div>
      );

    }

    return lista;

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

    this.temas[this.atual.indexAtual].ativo = false;
    this.temas[novoIndex].ativo = true;

    this.atual.definirAtuais(this.temas, this.forceUpdate.bind(this));


  }

  filtrar(valor: string) {

    let primeiro = true;

    this.temas.map((tema: Tema) => {

      if (valor) {

        tema.mostrar = Helpers.removerAcentosMinusculo(tema.texto).includes(Helpers.removerAcentosMinusculo(valor));

        if (tema.mostrar) {

          tema.ativo = primeiro;
          primeiro = false;

        } else
          tema.ativo = false;

      } else
        tema.mostrar = true;

      return true;

    });

    if(this.atual) {

      if (!valor)
        this.temas[0].ativo = true;

      this.atual.definirAtuais(this.temas, this.forceUpdate.bind(this));

    }

  }

  selecionadoTema = (e) => {

    e.preventDefault();

    let tema = this.temas.filter(tema => tema.mostrar)[this.atual.indexAtual];

    this.usuario.iniciarJogo();

    this.setState({
      pagina_destino: {
        pathname: '/questoes',
        state: { tema: tema }
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
            <Input nome="filtro" placeholder="Pesquise pelo seu tema..." funcState={this.setState.bind(this)}
                   onChangeFunc={this.filtrar.bind(this)} state={this.state}/>
          </div>
          <div className={`row selecionar-tema`}>
            { this.mostrarTemas() }
          </div>
          <div className={`arrows-container`}>
            { this.mostrarArrow() }
          </div>
          <ButtonSubmit texto={this.carregando ? "Carregando" : "Selecionar"} disabled={this.temas.filter(tema => tema.mostrar).length === 0 || this.carregando}/>
        </form>
      </div>
    );
  }

}

export default Temas;
