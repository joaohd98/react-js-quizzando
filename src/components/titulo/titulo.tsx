import React, { Component } from 'react';
import './titulo.scss';

interface TituloInterface {
  texto: string;
}

class Titulo extends Component<TituloInterface> {

  render() {
    return (
      <h1>{this.props.texto}</h1>
    );
  }

}

export default Titulo;
