import * as React from 'react';
import './inicio.scss';
import logo from '../../assets/icons/logo.svg';
import Titulo from "../../components/titulo/titulo";
import Input, {StateInterface} from "../../components/input/input";
import {Validations} from "../../validations/validations";


class Inicio extends React.Component {

  constructor(props: any){
    super(props);

    let nome: StateInterface = {
      valor: "",
      valido: null,
      erro_mensagem: "",
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

    alert(Validations.validarFormulario(this.state, this.setState.bind(this)) ? "valido" : "invalido");

    console.log(this.state);

  };

  render() {
    return (
      <div className="inicio">
        <img src={logo} alt="logo"/>
        <Titulo texto="Quizzando"/>
        <form onSubmit={this.comecarJogo} method="post">
          <Input state={this.state} funcState={this.setState.bind(this)} nome="nome" placeholder="Digite o seu nome"/>
          <button>Jogar</button>
        </form>
      </div>
    );
  }

}

export default Inicio;
