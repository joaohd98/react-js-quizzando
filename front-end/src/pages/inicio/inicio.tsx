import * as React from 'react';
import './inicio.scss';
import logo from '../../assets/icons/logo.svg';
import Titulo from "../../components/titulo/titulo";
import Input from "../../components/input/input";


class Inicio extends React.Component {

  constructor(props: any){
    super(props);

    this.state = {
      nome: "",
    };

  }

  comecarJogo = (event: any) => {

    event.preventDefault();

    console.log(this.state);


  };

  render() {
    return (
      <div className="inicio">
        <img src={logo} alt="logo"/>
        <Titulo texto="Quizzando"/>
        <form onSubmit={this.comecarJogo} method="post">
          <Input state={this.state} funcState={this.setState.bind(this)} nome="nome" tipo="text" placeholder="Digite o seu nome"/>
          <button>Jogar</button>
        </form>
      </div>
    );
  }

}

export default Inicio;
