import * as React from 'react';
import './inicio.scss';
import logo from '../../assets/icons/logo.svg';
import Titulo from "../../components/titulo/titulo";
import Input, {StateInterface} from "../../components/input/input";
import {Validations} from "../../validations/validations";
import ButtonSubmit from "../../components/button-submit/button-submit";
import LazyLoadImg from "../../components/lazy-load-img/lazy-load-img";
import { connect } from 'react-redux';

interface InicioInterface {
  nome: StateInterface,
  teste: StateInterface,
  entrar: Function
}

class Inicio extends React.Component<InicioInterface> {

  constructor(props){
    super(props);

    this.comecarJogo = this.comecarJogo.bind(this);

  }

  comecarJogo(event){

    event.preventDefault();

    let retorno = Validations.validarFormulario([{
      nome:  'nome',
      campo: this.props.nome
    }]);

    if(retorno) {
     // this.props.entrar(this.props.nome.valor);
      alert(0);
    }
  }

  render() {

    return (
      <div className="inicio">
        <form onSubmit={this.comecarJogo} method="post">
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
  nome: state.loginReducer.nome,
});

const mapDispatchToProps = dispatch => ({
  entrar: (type: string , nome: string) => dispatch({type: type, nome: nome}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
