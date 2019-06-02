import {StateInterface} from "../components/input/input";

export class Validations{

  static validarCampo(tipo: string, valor: string = '', parametro: object | undefined = {}){

    switch (tipo) {
      case "required": return Validations.required(valor);
      case "min-length": return Validations.min_length(valor, parametro['numero']);
      case "max-length": return Validations.max_length(valor, parametro['numero']);
    }

  }

  static validarFormulario(state: any, funcState: Function){

    let formularioValido = true;
    let retorno:any = {};

    for(let chave in state){

      let campo: StateInterface = state[chave];
      let valido = true;

      retorno[chave] = campo.valor;

      for(let i = 0; campo.validations && i < campo.validations.length; i++){

        let validation = campo.validations[i];

        if(!Validations.validarCampo(validation.regra, campo.valor, validation.paramtros)){

          if(formularioValido) {

            campo.ref.current.focus();
            campo.class = 'input-invalido-formulario';

          }

          campo.erro_mensagem = validation.texto;

          valido = false;
          formularioValido = false;

          break;

        }

      }

      campo.valido = valido;

      funcState({
        [chave]: campo
      });

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
