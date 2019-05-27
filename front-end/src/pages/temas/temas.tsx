import * as React from 'react';
import './temas.scss';
import {Usuario} from "../../models/usuario";
import {Redirect} from "react-router";
import Titulo from "../../components/titulo/titulo";
import ButtonSubmit from "../../components/button-submit/button-submit";
import {Tema} from "../../models/tema";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Temas extends React.Component {

  usuario: Usuario = Usuario.pegarUsuario();
  temas: Array<Tema>;

  constructor(props) {
    super(props);

    this.temas = [
      {
        id: 0,
        texto: "Cinema",
        img: "https://www.guiabh.com.br/Repositorio/Upload/Destaque/320x320/cinema-com-desconto-em-bh-imagem.jpg",
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

    this.inicializarTema();

  }

  inicializarTema() {


  }

  sair = () => {

    Usuario.sair();

    this.setState({
      'pagina_destino': "/login"
    });

  };

  mostrarTemas = () => {

    let tamanho = this.temas.length;
    let index = -1;

    for (let i = 0; i < tamanho; i++) {

      if (this.temas[i].ativo) {

        index = i;
        break;

      }

    }

    let indexAnterior = index - 1;
    indexAnterior = indexAnterior >= 0 ? indexAnterior : tamanho - 1;

    let indexPosterior = index + 1;
    indexPosterior = indexPosterior < tamanho ? indexPosterior : 0;

    return (
      <div className={`row selecionar-tema`}>
        <div className={"card left"}>
          <img src={this.temas[indexAnterior].img} alt={this.temas[indexAnterior].texto}/>
          <p>{this.temas[indexAnterior].texto}</p>
        </div>
        <div className={"card card-selected"}>
          <img src={this.temas[index].img} alt={this.temas[index].texto}/>
          <p>{this.temas[index].texto}</p>
        </div>
        <div className={"card right"}>
          <img src={this.temas[indexPosterior].img} alt={this.temas[indexPosterior].texto}/>
          <p>{this.temas[indexPosterior].texto}</p>
        </div>
      </div>
    )

  };

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
          {this.mostrarTemas()}
          <div className={`row arrows-container`}>
            <FontAwesomeIcon icon="arrow-left" color="white" />
            <FontAwesomeIcon icon="arrow-right" color="white" />
          </div>
          <ButtonSubmit texto="Selecionar"/>
        </form>
      </div>
    );
  }

}

export default Temas;
