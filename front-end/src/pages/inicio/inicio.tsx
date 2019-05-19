import * as React from 'react';
import './inicio.scss';
import logo from '../../assets/icons/logo.svg';
import Titulo from "../../components/titulo/titulo";


class Inicio extends React.Component {

  render() {
    return (
      <div className="inicio">
        <img src={logo} alt="logo"/>
        <Titulo texto="Quizzando"/>
        <input type="text" placeholder="Digite seu nome"/>
        <button>Jogar</button>
      </div>
    );
  }

}

export default Inicio;
