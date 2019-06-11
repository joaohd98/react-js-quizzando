import * as React from 'react';
import './inicio.scss';
import logo from '../../assets/icons/logo.svg';
import Titulo from "../../components/titulo/titulo";
import Input from "../../components/input/input";
import {Validations} from "../../validations/validations";
import ButtonSubmit from "../../components/button-submit/button-submit";
import {Redirect} from "react-router";
import {Usuario} from "../../models/usuario";
import LazyLoadImg from "../../components/lazy-load-img/lazy-load-img";
import { connect } from 'react-redux';

const mapStateToProps = state => (
  state.loginReducer
);

class Inicio extends React.Component {

  comecarJogo(event){

    event.preventDefault();

    let retorno = Validations.validarFormulario(this.props, this.setState.bind(this));

    if(!retorno)
      return;

    Usuario.entrar(retorno["nome"]);

    this.setState({
      'pagina_destino': "/"
    });

  }

  render() {

    if(this.state && this.state['pagina_destino'])
      return <Redirect to={this.state['pagina_destino']}/>;

    return (
      <div className="inicio">
        <form onSubmit={this.comecarJogo.bind(this)} method="post">
          <div className="img-container">
            <LazyLoadImg img={logo} alt="logo"/>
          </div>
          <Titulo texto="Quizzando" subtitulo="English Edition"/>
          <Input state={this.state} funcState={this.setState.bind(this)} nome="nome" placeholder="Digite o seu nome"/>
          <ButtonSubmit texto="JOGAR"/>
        </form>
      </div>
    );

  }

}

export default connect(mapStateToProps)(Inicio);
