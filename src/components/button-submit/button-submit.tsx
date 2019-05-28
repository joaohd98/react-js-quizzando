import React, { Component } from 'react';
import './button-submit.scss';

interface ButtonSubmitInterface {
  texto: string;
  disabled?: boolean;
}

class ButtonSubmit extends Component<ButtonSubmitInterface> {

  render() {
    return (
      <div className="button-submit-container">
        <button disabled={this.props.disabled}>{this.props.texto}</button>
      </div>
    );
  }

}

export default ButtonSubmit;
