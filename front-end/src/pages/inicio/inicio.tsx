import * as React from 'react';
import './inicio.scss';
import logo from '../../assets/icons/logo.svg';

function Inicio() {
    return (
        <div className="inicio">
          <img src={logo} alt="logo"/>
          <h1>Quizzando</h1>
          <input type="text" placeholder="Digite seu nome"/>
          <button>jogar</button>
        </div>
    );
}

export default Inicio;
