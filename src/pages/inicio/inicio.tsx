import * as React from 'react';
import './inicio.scss';
import logo from '../../assets/icons/logo.svg';
import Titulo from "../../components/titulo/titulo";
import Input, {StateInterface} from "../../components/input/input";
import {Validations} from "../../validations/validations";
import ButtonSubmit from "../../components/button-submit/button-submit";
import {Redirect} from "react-router";
import {Usuario} from "../../models/usuario";
import LazyLoadImg from "../../components/lazy-load-img/lazy-load-img";

class Inicio extends React.Component {

  constructor(props: any){
    super(props);
    
    let nome: StateInterface = {
      validations: [
        {
          regra: "required",
          texto: "Campo nome é obrigatório."
        },
        {
          regra: "min-length",
          paramtros: { numero: 3 },
          texto: "Campo tem que ter no mínimo 3 letras."
        },{
          regra: "max-length",
          paramtros: { numero: 20 },
          texto: "Campo tem que ter no máximo 20 letras."
        },
      ]
    };

    this.state = {
      nome: nome
    };

  }

  comecarJogo = (event: any) => {

    event.preventDefault();

    let retorno = Validations.validarFormulario(this.state, this.setState.bind(this));

    if(!retorno)
      return;

    Usuario.entrar(retorno["nome"]);

    this.setState({
      'pagina_destino': "/"
    });

  };

  render() {

    if(this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']}/>;

    return (
      <div className="inicio">
        <form onSubmit={this.comecarJogo} method="post">
          <div className="img-container">
            <LazyLoadImg img={logo} alt="logo"/>
          </div>
          <Titulo texto="Quizzando" subtitulo="English Edition"/>
          <Input state={this.state} funcState={this.setState.bind(this)} nome="nome" placeholder="Digite o seu nome"/>
          <ButtonSubmit texto="JOGAR"/>
        </form>
      </div>
    );

  }

}

export default Inicio;
