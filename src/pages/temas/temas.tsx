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

class Temas extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();
  atual: TemasAtuais;
  temas: Array<Tema>;

  constructor(props) {

    super(props);

    let filtro: StateInterface = {};

    this.state = {
      filtro: filtro
    };

    this.inicializarTema();

  }

  inicializarTema() {

    this.temas = [
      {
        id: 0,
        texto: "Cinema",
        img: "https://www.guiabh.com.br/Repositorio/Upload/Destaque/320x320/cinema-com-desconto-em-bh-imagem.jpg",
        ativo: true,
        mostrar: true,
      },
      {
        id: 1,
        texto: "Quadrinhos",
        img: "https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=9371883&qld=90&l=430&a=-1=1003410132",
        mostrar: true,
      },
      {
        id: 2,
        texto: "Video games",
        img: "https://ih0.redbubble.net/image.451897458.7410/flat,550x550,075,f.u1.jpg",
        mostrar: true,
      },
      {
        id: 3,
        texto: "Disney",
        img: "https://media-cdn.tripadvisor.com/media/photo-s/05/7a/36/ab/castelo-da-disney.jpg",
        mostrar: true,
      },
      {
        id: 4,
        texto: "Futebol",
        img: "https://assets.nike.com.br/Html/hotsites/t4content/futebol/slp-masculino/skin/img/mobile/central-cr7-cristiano-futebol-nike.jpg",
        mostrar: true,
      },
    ];

    this.atual = new TemasAtuais(this.temas);

  }

  sair = () => {

    Usuario.sair();

    this.setState({
      'pagina_destino': "/login"
    });

  };

  mostrarTemas = () => {

    let temas = this.temas.filter(tema => tema.mostrar);
    let tamanho = temas.filter(tema => tema.mostrar).length;

    if (tamanho > 1) {

      return (
        <div className={`row selecionar-tema`}>
          <div className={"card left"} onClick={() => this.moverSelecionado("esquerda")}>
            <img src={temas[this.atual.indexAnterior].img} alt={temas[this.atual.indexAnterior].texto}/>
            <p>{temas[this.atual.indexAnterior].texto}</p>
          </div>
          <div className={"card card-selected"}>
            <img src={temas[this.atual.indexAtual].img} alt={temas[this.atual.indexAtual].texto}/>
            <p>{temas[this.atual.indexAtual].texto}</p>
          </div>
          <div className={"card right"} onClick={() => this.moverSelecionado("direita")}>
            <img src={temas[this.atual.indexProximo].img} alt={temas[this.atual.indexProximo].texto}/>
            <p>{temas[this.atual.indexProximo].texto}</p>
          </div>
        </div>
      )

    } else if (tamanho === 1) {

      return (
        <div className={`row selecionar-tema`}>
          <div className={"card card-selected"}>
            <img src={temas[this.atual.indexAtual].img} alt={temas[this.atual.indexAtual].texto}/>
            <p>{temas[this.atual.indexAtual].texto}</p>
          </div>
        </div>
      )

    } else {

      return (
        <div className={`row selecionar-tema`}>
          <p className="sem-temas">Não foram encontrados temas referentes a busca.</p>
        </div>
      )

    }

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

    if (!valor)
      this.temas[0].ativo = true;

    this.atual.definirAtuais(this.temas, this.forceUpdate.bind(this));

  }

  selecionadoTema = (e) => {

    e.preventDefault();
    
    let tema = this.temas.filter(tema => tema.mostrar)[this.atual.indexAtual];

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
          <div className={`row row-header`}>
            <p>{`Olá, ${this.usuario.nome}`}</p>
            <p onClick={this.sair}>
              <FontAwesomeIcon icon="sign-out-alt" color="white"/>
              Sair
            </p>
          </div>
          <div className={`row row-sub-header`}>
            <Titulo texto="TEMAS"/>
          </div>
          <div className={`row row-filtro`}>
            <Input nome="filtro" placeholder="Pesquise pelo seu tema..." funcState={this.setState.bind(this)}
                   onChangeFunc={this.filtrar.bind(this)} state={this.state}/>
          </div>
          {this.mostrarTemas()}
          <div className={`arrows-container`}>
            {
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
            }
          </div>
          <ButtonSubmit texto="Selecionar" disabled={this.temas.filter(tema => tema.mostrar).length === 0}/>
        </form>
      </div>
    );
  }

}

export default Temas;
