export class Twitter {

  nome: string = "Donald J. Trump";
  hashtag: string = "@realDonaldTrump";
  foto: string = "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_bigger.jpg";

  mensagens: Array<string> = [
    "Congratulations."
  ];

  gerarFotoAleatoria(index){

    return `https://picsum.photos/28?random=${index}`;

  }
}
