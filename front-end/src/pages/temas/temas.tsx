import * as React from 'react';
import './temas.scss';
import {Usuario} from "../../models/usuario";
import {Redirect} from "react-router";
import Titulo from "../../components/titulo/titulo";
import ButtonSubmit from "../../components/button-submit/button-submit";
import {Tema, TemasAtuais} from "../../models/tema";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Temas extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();
  atual:  TemasAtuais;
  temas: Array<Tema>;

  constructor(props) {

    super(props);

    this.inicializarTema();

  }

  inicializarTema() {

    this.temas = [
      {
        id: 0,
        texto: "Cinema",
        img: "https://www.guiabh.com.br/Repositorio/Upload/Destaque/320x320/cinema-com-desconto-em-bh-imagem.jpg",
        ativo: true
      },
      {
        id: 1,
        texto: "Quadrinhos",
        img: "https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=9371883&qld=90&l=430&a=-1=1003410132",
        ativo: true
      },
      {
        id: 2,
        texto: "Video games",
        img: "https://ih0.redbubble.net/image.451897458.7410/flat,550x550,075,f.u1.jpg",
      },
      {
        id: 3,
        texto: "Disney",
        img: "https://media-cdn.tripadvisor.com/media/photo-s/05/7a/36/ab/castelo-da-disney.jpg",
      },
      {
        id: 4,
        texto: "Futebol",
        img: "https://assets.nike.com.br/Html/hotsites/t4content/futebol/slp-masculino/skin/img/mobile/central-cr7-cristiano-futebol-nike.jpg",
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

    if(this.temas.length > 1){

      return (
        <div className={`row selecionar-tema`}>
          <div className={"card left"} onClick={() => this.moverSelecionado("esquerda")}>
            <img src={this.temas[this.atual.indexAnterior].img} alt={this.temas[this.atual.indexAnterior].texto}/>
            <p>{this.temas[this.atual.indexAnterior].texto}</p>
          </div>
          <div className={"card card-selected"}>
            <img src={this.temas[this.atual.indexAtual].img} alt={this.temas[this.atual.indexAtual].texto}/>
            <p>{this.temas[this.atual.indexAtual].texto}</p>
          </div>
          <div className={"card right"} onClick={() => this.moverSelecionado("direita")}>
            <img src={this.temas[this.atual.indexProximo].img} alt={this.temas[this.atual.indexProximo].texto}/>
            <p>{this.temas[this.atual.indexProximo].texto}</p>
          </div>
        </div>
      )

    }

    else{

      return (
        <div className={`row selecionar-tema`}>
          <div className={"card card-selected"}>
            <img src={this.temas[this.atual.indexAtual].img} alt={this.temas[this.atual.indexAtual].texto}/>
            <p>{this.temas[this.atual.indexAtual].texto}</p>
          </div>
        </div>
      )

    }

  };

  moverSelecionado(direcao: "esquerda" | "direita"){

    let novoIndex = direcao === "esquerda" ? this.atual.indexAnterior : this.atual.indexProximo;

    this.temas[this.atual.indexAtual].ativo = false;
    this.temas[novoIndex].ativo = true;

    this.atual.definirAtuais(this.temas);

    this.forceUpdate();

  }

  selecionadoTema = () => {


  };

  render() {

    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']}/>;

    return (
      <div className="temas">
        <form onSubmit={this.selecionadoTema} method="post">
          <div className={`row row-header`}>
            <p>{`Olá, ${this.usuario.nome}`}</p>
            <p onClick={this.sair}>
              <FontAwesomeIcon icon="sign-out-alt" color="white" />
              Sair
            </p>
          </div>
          <div className={`row row-sub-header`}>
            <Titulo texto="TEMAS"/>
          </div>
          { this.mostrarTemas() }
          { this.temas.length > 1 ?
            <div className={`row arrows-container`}>
              <i onClick={() => this.moverSelecionado("esquerda")}>
                <FontAwesomeIcon icon="arrow-left" color="#7F37D9" />
              </i>
              <i onClick={() => this.moverSelecionado("direita")}>
                <FontAwesomeIcon icon="arrow-right" color="#7F37D9" />
              </i>
            </div>
            : ''
          }

          <ButtonSubmit texto="Selecionar"/>
        </form>
      </div>
    );
  }

}

export default Temas;
