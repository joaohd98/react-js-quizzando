import React, { Component } from 'react';
import './input.scss';

interface InputInterface {
  state: any,
  funcState: Function,
  nome: string,
  tipo: "text",
  placeholder: string
}

class Input extends Component<InputInterface> {

  changeHandler = (event: any) => {

    const nome = event.target.name;
    const valor = event.target.value;

    this.props.funcState({
      [nome]: valor
    });

  };

  render() {
    return (
      <div className="input-container">
        <input type={this.props.tipo} name={this.props.nome} autoComplete="off" onChange={this.changeHandler} value={this.props.state[this.props.nome]} placeholder={this.props.placeholder}/>
      </div>
    );
  }

}

export default Input;
