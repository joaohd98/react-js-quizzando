import * as React from 'react';
import './questoes.scss';
import {Redirect} from "react-router";
import {Tema} from "../../models/tema";

class Questoes extends React.Component {

  tema: Tema;

  componentDidMount(){

    if(this.props['location'].state === undefined || this.props['location'].state.tema === undefined)
      return this.setState({ pagina_destino: '/' });

    else{

      this.tema = this.props['location'].state.tema;

      window.history.replaceState({}, '/questoes');

    }

  }

  render() {

    if(this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}   />;

    return (
      <div className="questoes">
        <p>TESTE</p>
      </div>
    );

  }

}

export default Questoes;
