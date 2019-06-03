export class Twitter {

  nome: string = "Donald J. Trump";
  hashtag: string = "@realDonaldTrump";
  foto: string = "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_bigger.jpg";
  mensagem: string;
  dataFormatada: string;
  qtComentarios: number;
  qtRetweets: number;
  qtCurtidas: number;

  mensagens: Array<string> = [
    "You look gorgeous!",
    "I find you super intelligent.",
    "You’re awesome.",
    "You are the most intelligent person I’ve ever met.",
    "You’re doing a great job",
    "I am really proud of you.",
    "Keep up the good work, you are an inspiration.",
    "I wish I was as intelligent as you are.",
    "You're inspiring.",
    "Keep up the good work. It’s inspiring.",
    "Nice work. You are great at it.",
    "You are the best in the world!",
  ];

  constructor(){

    this.mensagem = this.gerarMensagemAleatoria();
    this.dataFormatada = this.formatarDataAtual();

    this.qtCurtidas    = this.gerarQuantidade(15000, 90000);
    this.qtRetweets    = this.gerarQuantidade(5000, this.qtCurtidas - 10000);
    this.qtComentarios = this.gerarQuantidade(1000, this.qtRetweets - 2500);

  }

  gerarFotoAleatoria(index){

    return `https://picsum.photos/28?random=${index}`;

  }

  private gerarMensagemAleatoria(){

    return this.mensagens[Math.floor(Math.random() * this.mensagens.length)];

  }

  private formatarDataAtual(){

    let data = new Date();

    let hora = data.getHours() < 9 ? "0" + data.getHours() : data.getHours();
    let minuto = data.getMinutes() < 9 ? "0" + data.getMinutes() : data.getMinutes();

    let dia = data.getDay();

    let meses = [
      'jan', 'fev', 'mar', 'abr', 'maio', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'
    ];

    let mes = meses[data.getMonth()];

    let ano = data.getFullYear();

    return `
      ${hora}:${minuto} - ${dia} de ${mes} de ${ano}
    `;

  }

  private gerarQuantidade(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;

  }

}
