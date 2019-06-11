import * as React from 'react';
import './inicio.scss';
import logo from '../../assets/icons/logo.svg';
import Titulo from "../../components/titulo/titulo";
import Input, {StateInterface} from "../../components/input/input";
import {Validations} from "../../validations/validations";
import ButtonSubmit from "../../components/button-submit/button-submit";
import {Usuario} from "../../models/usuario";
import LazyLoadImg from "../../components/lazy-load-img/lazy-load-img";
import { connect } from 'react-redux';
import {LOGAR} from "../../redux/actions/action-types";
import { push } from 'connected-react-router'

interface InicioInterface {
  nome: StateInterface
}

class Inicio extends React.Component<InicioInterface> {

  comecarJogo(event){

    event.preventDefault();

    let retorno = Validations.validarFormulario([{
      nome:  'nome',
      campo: this.props.nome
    }]);

    this.forceUpdate();

    if(retorno){

      Usuario.entrar(retorno["nome"]);
      push('/');

    }

  }

  render() {

    return (
      <div className="inicio">
        <form onSubmit={this.comecarJogo.bind(this)} method="post">
          <div className="img-container">
            <LazyLoadImg img={logo} alt="logo"/>
          </div>
          <Titulo texto="Quizzando" subtitulo="English Edition"/>
          <Input field={this.props.nome} nome="nome" placeholder="Digite o seu nome"/>
          <ButtonSubmit texto="JOGAR"/>
        </form>
      </div>
    );

  }

}

const mapStateToProps = state => ({
  nome: state.loginReducer.nome
});

const mapDispatchToProps = dispatch => ({
  entrar: () => dispatch({type: LOGAR}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
