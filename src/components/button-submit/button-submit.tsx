import React, {Component, MouseEventHandler} from 'react';
import './button-submit.scss';

interface ButtonSubmitInterface {
  texto: string;
  disabled?: boolean;
  func?: MouseEventHandler;
}

class ButtonSubmit extends Component<ButtonSubmitInterface> {

  render() {
    return (
      <div className="button-submit-container">
        <button disabled={this.props.disabled} onClick={this.props.func ? this.props.func : () => {}}>{this.props.texto}</button>
      </div>
    );
  }

}

export default ButtonSubmit;
