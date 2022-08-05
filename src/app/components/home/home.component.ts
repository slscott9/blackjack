import { Component, OnInit } from '@angular/core';
import { Card, cards } from 'src/app/interfaces/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards: any[] = cards

  deckCount: number = 1;

  dealerCards: Card[] = [];
  playerCards: Card[] = [];

  showPlayerCardCount: boolean = false;
  showDealerCardCount: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.shuffle()
    this.addPlayerCard();
    this.incremnetDeckCount();
    this.addDealerCard();
    this.incremnetDeckCount();
    this.addDealerCard();
  }

  reset() {
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
    if(this.deckCount === 52) {
      this.deckCount = 1;
      this.shuffle();
    } else {
      this.deckCount += 1
    }
  }


  addPlayerCard() {
    this.playerCards.push(this.cards[this.deckCount]);
    this.incremnetDeckCount(); //needs work since last card will shuffle automatically
  }

  addDealerCard() {
    this.dealerCards.push(this.cards[this.deckCount]);
    this.incremnetDeckCount(); //needs work since last card will shuffle automatically
  }


  togglePlayerCardCount() {
    this.showPlayerCardCount = !this.showPlayerCardCount
  }

  toggleDealerCardCount() {
    this.showDealerCardCount = !this.showDealerCardCount
  }

  // calculatePlayerCardCount() {
  //   let playerCardCount = 0;

  //   for(let i = 0; i < this.playerCards.length; i++) {
  //     playerCardCount += this.playerCards[i].cardValue
  //   }

  //   return playerCardCount;
  // }

  calculateCardCount(card: Card[]) {
    let cardCount = 0;

    for(let i = 0; i < card.length; i++) {
      cardCount += card[i].cardValue
    }

    return cardCount;
  }




}
