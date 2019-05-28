import {StateInterface} from "../components/input/input";

export class Validations{

  static validarCampo(tipo: string, valor: string = ''){

    switch (tipo) {
      case "required": return Validations.required(valor);
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

        if(!Validations.validarCampo(validation.regra, campo.valor)){

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

}