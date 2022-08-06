import { Injectable } from '@angular/core';
import { Card } from 'src/app/interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class GameUtilityService {

  cards: Card[] = [];
  deckCount: number = 0;

  cardsDealt: boolean = false;
  dealerCards: Card[] = [];
  playerCards: Card[] = [];

  playerWinMessage: string = ''
  dealerWinMessage: string = ''

  showPlayerCardCount: boolean = false;
  showDealerCardCount: boolean = false;

  constructor() { }

  setCards(cards: Card[]) {
    this.cards = cards;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i >= 0; i--) {
      const tmpIdx = this.getRandomInt(i + 1);

      const tmpVal = this.cards[tmpIdx];
      this.cards[tmpIdx] = this.cards[i];
      this.cards[i] = tmpVal;
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  incremnetDeckCount() {
    if (this.deckCount === 52) {
      this.deckCount = 1;
      this.shuffle();
    } else {
      this.deckCount += 1
    }
  }

  addPlayerCard() {
    this.incremnetDeckCount(); //needs work since last card will shuffle automatically
    this.playerCards.push(this.cards[this.deckCount]);
    this.playerWinMessage = this.determineWinner(this.playerCards)
    return this.playerWinMessage;

  }

  addDealerCard() {
    this.incremnetDeckCount(); //needs work since last card will shuffle automatically
    this.dealerCards.push(this.cards[this.deckCount]);
    this.dealerWinMessage = this.determineWinner(this.dealerCards)
    return this.dealerWinMessage;
  }

  togglePlayerCardCount() {
    this.showPlayerCardCount = !this.showPlayerCardCount
    return this.showPlayerCardCount;

  }

  toggleDealerCardCount() {
    this.showDealerCardCount = !this.showDealerCardCount
    return this.showDealerCardCount;
  }

  calculateCardCount(card: Card[]) {
    let cardCount = 0;

    for (let i = 0; i < card.length; i++) {
      cardCount += card[i].cardValue
    }

    return cardCount;
  }

  dealCards() {
    this.deckCount += this.playerCards.length
    this.deckCount += this.dealerCards.length
    this.playerCards = []
    this.dealerCards = []
    this.deckCount += 1
    this.playerCards.push(this.cards[this.deckCount])
    this.deckCount += 1
    this.dealerCards.push(this.cards[this.deckCount])
    this.deckCount += 1
    this.playerCards.push(this.cards[this.deckCount])
    this.dealerWinMessage = ''
    this.playerWinMessage = ''
  }

  determineWinner(cards: Card[]): string {
    let cardCount = this.calculateCardCount(cards);

    switch(true) {
      case cardCount === 21: {
          return 'Hit 21'
        break;
      }
      case cardCount > 21: {
          return `Bust ${cardCount}`
        break;
      }
      default: return ''
    }

  }



}
