import {StateInterface} from "../components/input/input";

export class Validations{

  static validarCampo(tipo: string, valor: string = '', parametro: object | undefined = {}){

    switch (tipo) {
      case "required": return Validations.required(valor);
      case "min-length": return Validations.min_length(valor, parametro['numero']);
      case "max-length": return Validations.max_length(valor, parametro['numero']);
    }

  }

  static validarFormulario(states: {nome: string, campo: StateInterface, dispatch: Function}[]){

    let formularioValido = true;
    let retorno: null | object = {};

    for(let chave in states){

      let valido = true;
      let state = states[chave];

      retorno[state.nome] = state.campo.valor;

      state.campo.mostrarValidacao = true;

      for(let i = 0; state.campo.validations && i < state.campo.validations.length; i++){

        let validation = state.campo.validations[i];

        if(!Validations.validarCampo(validation.regra, state.campo.valor, validation.paramtros)){

          if(formularioValido) {

            state.campo.ref.current.focus();
            state.campo.class = 'input-invalido-formulario';

          }

          state.campo.erro_mensagem = validation.texto;

          valido = false;
          formularioValido = false;

          break;

        }

      }

      state.campo.valido = valido;

      state.dispatch({...state.campo});

    }

    return formularioValido ? retorno : null;

  }

  static required(valor: string){

    return valor && valor.trim().length > 0;

  }


  static min_length(valor: string, tamanho: number){

    return valor && valor.trim().length >= tamanho;

  }


  static max_length(valor: string, tamanho: number){

    return valor && valor.trim().length <= tamanho;

  }

}
