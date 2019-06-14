import React, { Component } from 'react';
import './input.scss';
import {Validations} from "../../validations/validations";
import { connect } from 'react-redux';
import {mudar_input_login} from "../../redux/actions/login-action";

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
  onChangeFunc?: Function,
  mudar_input: Function
}

class Input extends Component<InputInterface> {

  input: StateInterface = this.props.field;

  componentWillMount() {

    this.input.class = "";
    this.input.valido = null;
    this.input.mostrarValidacao = false;
    this.input.ref = React.createRef();

    if(!this.input.valor)
      this.input.valor = "";

    else {

      this.validar();
      this.props.mudar_input({
        ...this.input
      });

    }

  }

  componentDidUpdate(){

    this.input = this.props.field;

  }

  mostrarValidacao = () => {

    this.input.mostrarValidacao = true;

    this.validar();

    this.props.mudar_input({
      ...this.input
    });

  };
  
  mudarInput = (event: any) => {

    this.input.valor = event.target.value;

    if(this.props.onChangeFunc)
     this.props.onChangeFunc(this.input.valor);

    this.validar();

    this.props.mudar_input({
      ...this.input
    });

  };

  validar = () => {

    let valido = true;

    for(let i = 0; this.input.validations && i < this.input.validations.length; i++){

      let validation = this.input.validations[i];

      if(!Validations.validarCampo(validation.regra, this.input.valor, validation.paramtros)){

        this.input.erro_mensagem = validation.texto;
        valido = false;

        break;

      }

    }

    this.input.valido = valido;

    this.pegarClasseInput();

  };

  pegarClasseInput = () => {

    if(this.input.valido === null || this.input.validations === undefined)
      this.input.class = "";

    else if(this.input.valido)
      this.input.class = "input-valido";

    else
      this.input.class = this.input.mostrarValidacao ? "input-invalido" : "";

  };

  render() {

    return (
      <div className="input-container">
        <input className={this.input.class} ref={this.input.ref} onBlur={this.mostrarValidacao} type={this.props.tipo} name={this.props.nome} value={this.input.valor} autoComplete="off" onChange={this.mudarInput} placeholder={this.props.placeholder}/>
        { this.input.class && this.input.class.startsWith('input-invalido') ? (<span>{this.input.erro_mensagem}</span>) : ''}
      </div>
    );

  }

}

const mapDispatchToProps = dispatch => ({
  mudar_input: (inputField: StateInterface) => dispatch(mudar_input_login(inputField)),
});


export default connect(null, mapDispatchToProps) (Input);
