import React, { Component } from 'react';
import './titulo.scss';

interface TituloInterface {
  texto: string;
  subtitulo?: string;
}

class Titulo extends Component<TituloInterface> {

  render() {
    return (
      <div className="titulo">
        <h1>{this.props.texto}</h1>
        <h2>{this.props.subtitulo}</h2>
      </div>

    );
  }

}

export default Titulo;
