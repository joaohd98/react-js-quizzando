export class Twitter {

  nome: string = "Donald J. Trump";
  hashtag: string = "@realDonaldTrump";
  foto: string = "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_bigger.jpg";

  mensagens: Array<string> = [
    "Congratulations."
  ];

  gerarFotoAleatoria(){

    return 'https://source.unsplash.com/random/24x24';

  }
}
