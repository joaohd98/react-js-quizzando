export class Tema {

  id: number = 0;
  texto: string = "";
  img: string = "";
  ativo?: boolean = false;

}


export class TemasAtuais{

  indexAtual: number = -1;
  indexProximo: number = -1;
  indexAnterior: number = -1;

  constructor(temas: Array<Tema>) {

   this.definirAtuais(temas);

  }

  definirAtuais(temas: Array<Tema>){

    let tamanho = temas.length;
    let index = -1;

    for (let i = 0; i < tamanho; i++) {

      if (temas[i].ativo) {

        index = i;
        break;

      }

    }

    this.indexAtual = index;

    let indexAnterior = index - 1;
    this.indexAnterior = indexAnterior >= 0 ? indexAnterior : tamanho - 1;

    let indexPosterior = index + 1;
    this.indexProximo = indexPosterior < tamanho ? indexPosterior : 0;

  }

}
