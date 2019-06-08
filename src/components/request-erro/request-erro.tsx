import React, {Component,} from 'react';
import './request-erro.scss';
import ButtonSubmit from "../button-submit/button-submit";

interface RequestErroInterface {
}

class RequestErro extends Component<RequestErroInterface> {

  render() {
    return (
      <div key="center" className="erro-request">
        <div>Ooops! <br/>Aconteceu algum problema, deseja tentar novamente?</div>
        <ButtonSubmit texto="Tentar Novamente" func={() => window.location.reload()}/>
      </div>
    );
  }

}

export default RequestErro;
