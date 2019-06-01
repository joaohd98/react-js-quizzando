import * as React from 'react';
import './carregando.scss';
import {Tema} from "../../../models/tema";
import {Redirect} from "react-router";
import happy from '../../../assets/imgs/happy.png';
import sad from '../../../assets/imgs/sad.png';

class Carregando extends React.Component {


  acerto(){

    return (
      <div className="acerto">
        <div className="vidas">
          <img src={happy} alt={happy}/>
          <img src={happy} alt={happy}/>
          <img src={sad} alt={sad}/>
        </div>
        <p>2 vidas</p>
      </div>
    );

  }

  render() {

    if (this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']} push={this.state['push']}   />;

    return (
      <div className="carregando">
        { this.acerto() }
      </div>
    );
  }

}

export default Carregando;
