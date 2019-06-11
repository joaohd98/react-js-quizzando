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
  field: StateInterface,
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

    this.props.field.class = "";
    this.props.field.valido = null;
    this.props.field.mostrarValidacao = false;
    this.props.field.ref = React.createRef();

    if(!this.props.field.valor)
      this.props.field.valor = "";

    if(this.props.field.valor)
      this.validar();

  };

  mostrarValidacao = () => {

    this.props.field.mostrarValidacao = true;

    this.validar();

  };
  
  mudarInput = (event: any) => {

    this.props.field.valor = event.target.value;

    this.validar();
    this.pegarClasseInput();

    if(this.props.onChangeFunc)
      this.props.onChangeFunc(event.target.value);

    this.forceUpdate();

  };

  pegarClasseInput = () => {

    if(this.props.field.valido === null || this.props.field.validations === undefined)
      this.props.field.class = "";

    else if(this.props.field.valido)
      this.props.field.class = "input-valido";

    else
      this.props.field.class = this.props.field.mostrarValidacao ? "input-invalido" : "";

  };

  validar = () => {

    let valido = true;

    for(let i = 0; this.props.field.validations && i < this.props.field.validations.length; i++){

      let validation = this.props.field.validations[i];

      if(!Validations.validarCampo(validation.regra, this.props.field.valor, validation.paramtros)){

        this.props.field.erro_mensagem = validation.texto;
        valido = false;

        break;

      }

    }

    this.props.field.valido = valido;

    this.pegarClasseInput();

  };

  render() {

    return (
      <div className="input-container">
        <input className={this.props.field.class} ref={this.props.field.ref} onBlur={this.mostrarValidacao} type={this.props.tipo} name={this.props.nome} autoComplete="off" onChange={this.mudarInput} placeholder={this.props.placeholder}/>
        { this.props.field.class && this.props.field.class.startsWith('input-invalido') ? (<span>{this.props.field.erro_mensagem}</span>) : ''}
      </div>
    );

  }

}

export default Input;
