export class Tema {

  id: number = 0;
  texto: string = "";
  img: string = "";
  ativo?: boolean;
  mostrar?: boolean;

  constructor() {

    if(this.ativo === undefined)
      this.ativo = false;

    if(this.mostrar === undefined)
      this.mostrar = true;

  }

}
