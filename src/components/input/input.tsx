import React, { Component } from 'react';
import './input.scss';
import {Validations} from "../../validations/validations";

export interface StateInterface {
  valor?: string,
  valido?: any,
  erro_mensagem?: string;
  class?: string;
  ref?: any;
  mostrarValidacao?: boolean;
  validations?: Array<{
    regra: string,
    texto: string
    paramtros?: object
  }>
}

interface InputInterface {
  state: any,
  funcState: Function,
  nome: string,
  tipo?: "text",
  placeholder: string
  onChangeFunc?: Function
}

class Input extends Component<InputInterface> {

  constructor(props: any){
    super(props);

    this.inicializar();

  }

  inicializar = () => {

    let state: StateInterface = this.props.state[this.props.nome];

    state.class = "";
    state.valido = null;
    state.mostrarValidacao = false;
    state.ref = React.createRef();

    if(!state.valor)
      state.valor = "";

    this.props.state[this.props.nome] = state;

    if(this.props.state[this.props.nome].valor)
      this.validar();

  };

  mostrarValidacao = () => {

    const nome = this.props.nome;
    const state: StateInterface = this.props.state[nome];
    state.mostrarValidacao = true;

    this.props.funcState({
      [nome]: state
    });

    this.validar();

  };
  
  mudarInput = (event: any) => {

    const nome = this.props.nome;

    let state: StateInterface = this.props.state[nome];
    state.valor = event.target.value;

    this.props.funcState({
      [nome]: state
    });

    this.validar();
    this.pegarClasseInput();

    if(this.props.onChangeFunc)
      this.props.onChangeFunc(event.target.value)

  };

  pegarClasseInput = () => {

    let state: StateInterface = this.props.state[this.props.nome];

    if(state.valido === null || state.validations === undefined)
      state.class = "";

    else if(state.valido)
      state.class = "input-valido";

    else
      state.class = state.mostrarValidacao ? "input-invalido" : "";

  };

  validar = () => {

    const nome = this.props.nome;
    let state: StateInterface = this.props.state[nome];
    let valido = true;

    for(let i = 0; state.validations && i < state.validations.length; i++){

      let validation = state.validations[i];

      if(!Validations.validarCampo(validation.regra, state.valor, validation.paramtros)){

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
        <input className={this.props.state[this.props.nome].class} ref={this.props.state[this.props.nome].ref} onBlur={this.mostrarValidacao} type={this.props.tipo} name={this.props.nome} autoComplete="off" onChange={this.mudarInput} value={this.props.state[this.props.nome].valor} placeholder={this.props.placeholder}/>
        { this.props.state[this.props.nome].class && this.props.state[this.props.nome].class.startsWith('input-invalido') ? (<span>{this.props.state[this.props.nome].erro_mensagem}</span>) : ''}
      </div>
    );

  }

}

export default Input;
