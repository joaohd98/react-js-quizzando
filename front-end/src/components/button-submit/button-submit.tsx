import React, { Component } from 'react';
import './button-submit.scss';

interface ButtonSubmitInterface {
  texto: string;
}

class ButtonSubmit extends Component<ButtonSubmitInterface> {

  render() {
    return (
      <div className="button-submit-container">
        <button>{this.props.texto}</button>
      </div>
    );
  }

}

export default ButtonSubmit;
