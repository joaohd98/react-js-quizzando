import * as React from 'react';
import './inicio.scss';
import logo from '../../assets/icons/logo.svg';
import Titulo from "../../components/titulo/titulo";
import Input, {StateInterface} from "../../components/input/input";
import {Validations} from "../../validations/validations";
import ButtonSubmit from "../../components/button-submit/button-submit";
import {Redirect} from "react-router";


class Inicio extends React.Component {

  paginaDestino = "";

  constructor(props: any){
    super(props);

    let nome: StateInterface = {
      valor: "",
      valido: null,
      erro_mensagem: "",
      ref: React.createRef(),
      validations: [
        {
          regra: "required",
          texto: "Campo nome é obrigatório."
        }
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

    this.paginaDestino = "/temas";


  };

  render() {

    if(this.paginaDestino)
      return <Redirect to={this.paginaDestino}/>;

    return (
      <div className="inicio">
        <form onSubmit={this.comecarJogo} method="post">
          <img src={logo} alt="logo"/>
          <Titulo texto="Quizzando"/>
          <Input state={this.state} funcState={this.setState.bind(this)} nome="nome" placeholder="Digite o seu nome"/>
          <ButtonSubmit texto="JOGAR"></ButtonSubmit>
        </form>
      </div>
    );

  }

}

export default Inicio;
