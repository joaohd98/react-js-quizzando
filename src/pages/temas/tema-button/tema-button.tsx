import * as React from "react";
import './tema-button.scss'
import ButtonSubmit from "../../../components/button-submit/button-submit";

interface TemaButtonInterface{
  mostrar: boolean;
  disabled: boolean
  texto: string;
}

export class TemaButton extends React.Component<TemaButtonInterface>{

  gerarButton(){

    if(this.props.mostrar)
      return <ButtonSubmit texto="Selecionar" disabled={this.props.disabled}/>;

    else
      return <div/>
  }

  render() {

    return (
      <div className={`row row-button`}>
        { this.gerarButton() }
      </div>
    );

  }

}
