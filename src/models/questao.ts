export class Questao{

  id: number;
  texto: string;
  alternativas: Array<Alternativa>;

}

export class Alternativa{

  id: number;
  texto: string;
  selecionada: boolean;
  correta: boolean;

}
