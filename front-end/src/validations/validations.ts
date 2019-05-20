export class Validations{

  static validar(tipo: string, valor: string){

    switch (tipo) {
      case "required": return this.required(valor);
    }

  }

  static required(valor: string){

    return valor && valor.trim().length > 0;

  }

}
