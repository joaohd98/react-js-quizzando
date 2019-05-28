export class Helpers {

  static removerAcentosMinusculo(texto: string){

    texto = texto.toLowerCase();
    texto = texto.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    texto = texto.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    texto = texto.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    texto = texto.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    texto = texto.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    texto = texto.replace(new RegExp('[Ç]','gi'), 'c');

    return texto;

  }

}
