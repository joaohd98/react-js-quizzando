import {Alternativa, Questao} from "../models/questao";

export class QuestoesProvider {

  pegarQuestao(questao: Questao){

    questao.texto = "Crash Bandicoot foi usado como mascote de qual videogame ?";

    let alt1 = new Alternativa();
    alt1.correta = false;
    alt1.texto = "PS2";

    let alt2 = new Alternativa();
    alt2.correta = true;
    alt2.texto = "PS1";

    let alt3 = new Alternativa();
    alt3.correta = false;
    alt3.texto = "Super Nintendo";

    let alt4 = new Alternativa();
    alt4.correta = false;
    alt4.texto = "Nintendo DS";


    questao.alternativas = [];
    questao.alternativas.push(alt1);
    questao.alternativas.push(alt2);
    questao.alternativas.push(alt3);
    questao.alternativas.push(alt4);

  }

}
