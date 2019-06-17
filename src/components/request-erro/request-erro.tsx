import React, {Component,} from 'react';
import './request-erro.scss';
import ButtonSubmit from "../button-submit/button-submit";

interface RequestErroInterface {
  texto ?: string,
  func?: Function,
}

class RequestErro extends Component<RequestErroInterface> {

  texto: string;

  constructor(props){
    super(props);

    this.texto = this.props.texto === undefined ? "Aconteceu algum problema." : this.props.texto;


  }

  tentar(){

    if(this.props.func)
      this.props.func();

    else
      window.location.reload();

  }

  render() {
    return (
      <div key="center" className="erro-request">
        <p>Ooops! <br/>{this.texto} deseja tentar novamente?</p>
        <ButtonSubmit texto="Tentar Novamente" func={this.tentar.bind(this)}/>
      </div>
    );
  }

}

export default RequestErro;
