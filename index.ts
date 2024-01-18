export class GameScore {
  public static calculate(cards: [Card, Card, Card]): number {
    let highestScore = 0;
    const scorePerSuits = {
      [Suits.Spades]: 0,
      [Suits.Clovers]: 0,
      [Suits.Hearts]: 0,
      [Suits.Diamonds]: 0,
    };
    for (const card of cards) {
      const currentSuit = card.getSuit();
      const currentValue = card.getValue();
      scorePerSuits[currentSuit] += currentValue;
      if (scorePerSuits[currentSuit] > highestScore) {
        highestScore = scorePerSuits[currentSuit];
      }
    }

    return highestScore;
  }
}

export class Card {
  private readonly suit: Suits;
  private readonly value: CardValues;

  constructor(suit: Suits, value: CardValues) {
    this.suit = suit;
    this.value = value;
  }

  getSuit(): Suits {
    return this.suit;
  }

  getValue(): CardValues {
    return this.value;
  }
}

export enum Suits {
  Spades,
  Clovers,
  Hearts,
  Diamonds,
}

export enum CardValues {
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 10,
  Queen = 10,
  King = 10,
  Ace = 11,
}
