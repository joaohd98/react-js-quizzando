import * as React from "react";
import "./tema-filtro.scss";
import Input, {StateInterface} from "../../../components/input/input";

interface TemaFiltroInterface {
  filtro: StateInterface,
  filtrar: Function,
  mostrar: boolean
}

export class TemaFiltro extends React.Component<TemaFiltroInterface>{

  renderizarInput(){

    if(this.props.mostrar)
      return <Input field={this.props.filtro} mudar_input={this.props.filtrar} nome="filtro" placeholder="Pesquise pelo seu tema..."/>

    else
      return <div/>

  }

  render(){

    return (
      <div className={`row row-filtro`}>
        {this.renderizarInput()}
      </div>
    );

  }




}
