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

  static formatarPonto(numero: number | string){

    let numeroString = numero.toString();

    let tamanho = numeroString.length;
    let numeroFormatado = numeroString;
    let alteracoes = 0;

    for(let i = tamanho - 3; i > -1; i -= 3) {

      if (i - 1 > -1) {

        numeroFormatado = [numeroFormatado.slice(0, i + alteracoes), ".", numeroFormatado.slice(i)].join('')
        alteracoes++;

      }

    }

    return numeroFormatado;

  }

  static pegarPrimeirosDigitos(numero: number | string){

    let numeroString = numero.toString();

    numeroString = Helpers.formatarPonto(numeroString);

    return numeroString.split(".")[0];

  }

}
