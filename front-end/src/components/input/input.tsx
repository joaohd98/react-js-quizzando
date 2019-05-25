import React, { Component } from 'react';
import './input.scss';
import {Validations} from "../../validations/validations";

export interface StateInterface {
  valor?: string,
  valido?: any,
  erro_mensagem?: string;
  class?: string;
  ref: any;
  validations?: [
    {
      regra: string,
      texto: string
    }
  ]
}

interface InputInterface {
  state: any,
  funcState: Function,
  nome: string,
  tipo?: "text",
  placeholder: string
}

class Input extends Component<InputInterface> {

  constructor(props: any){
    super(props);

    let state: StateInterface = this.props.state[this.props.nome];

    if(!state.valor)
      state.valor = "";

    if(!state.class)
      state.class = "";

    if(!state.valido)
      state.valido = null;

    this.props.state[this.props.nome] = state;

    if(this.props.state[this.props.nome].valor)
      this.validar();

  }

  mudarInput = (event: any) => {

    const nome = this.props.nome;

    let state: StateInterface = this.props.state[nome];
    state.valor = event.target.value;

    this.props.funcState({
      [nome]: state
    });

    this.validar();
    this.pegarClasseInput();

  };

  pegarClasseInput = () => {

    let state: StateInterface = this.props.state[this.props.nome];

    if(state.valido == null)
      state.class = "";

    state.class = state.valido ? "input-valido" : "input-invalido";

  };

  validar = () => {

    const nome = this.props.nome;
    let state: StateInterface = this.props.state[nome];
    let valido = true;

    for(let i = 0; state.validations && i < state.validations.length; i++){

      let validation = state.validations[i];

      if(!Validations.validarCampo(validation.regra, state.valor)){

        state.erro_mensagem = validation.texto;
        valido = false;

        break;

      }

    }

    state.valido = valido;

    this.props.funcState({
      [nome]: state
    });

    this.pegarClasseInput();

  };

  render() {

    return (
      <div className="input-container">
        <input className={this.props.state[this.props.nome].class} ref={this.props.state[this.props.nome].ref} onBlur={this.validar} type={this.props.tipo} name={this.props.nome} autoComplete="off" onChange={this.mudarInput} value={this.props.state[this.props.nome].valor} placeholder={this.props.placeholder}/>
        { this.props.state[this.props.nome].class && this.props.state[this.props.nome].class.startsWith('input-invalido') ? (<span>{this.props.state[this.props.nome].erro_mensagem}</span>) : ''}
      </div>
    );

  }

}

export default Input;
