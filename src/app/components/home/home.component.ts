import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Card, cards } from 'src/app/interfaces/types';
declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  cards: any[] = cards

  deckCount: number = 0;

  cardsDealt: boolean = false;
  dealerCards: Card[] = [];
  playerCards: Card[] = [];

  showPlayerCardCount: boolean = false;
  showDealerCardCount: boolean = false;

  @ViewChild('front')
  front!: ElementRef;

  @ViewChild('back')
  back!: ElementRef;


  constructor() { }

  ngOnInit(): void {
    this.shuffle()
    this.dealCards()

    // this.addPlayerCard();
    // this.incremnetDeckCount();
    // this.addDealerCard();
    // this.incremnetDeckCount();
    // this.addDealerCard();
  }

  ngAfterViewInit(): void {
    // this.handleFlip()
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
  }

  addDealerCard() {
    this.incremnetDeckCount(); //needs work since last card will shuffle automatically
    this.dealerCards.push(this.cards[this.deckCount]);
  }

  togglePlayerCardCount() {
    this.showPlayerCardCount = !this.showPlayerCardCount
  }

  toggleDealerCardCount() {
    this.showDealerCardCount = !this.showDealerCardCount
  }

  calculateCardCount(card: Card[]) {
    let cardCount = 0;

    for (let i = 0; i < card.length; i++) {
      cardCount += card[i].cardValue
    }

    return cardCount;
  }

  dealCards() {
    this.playerCards = []
    this.dealerCards = []
    this.deckCount += 1
    this.playerCards.push(this.cards[this.deckCount])
    this.deckCount += 1
    this.dealerCards.push(this.cards[this.deckCount])
    this.deckCount += 1
    this.playerCards.push(this.cards[this.deckCount])
    // this.deckCount += 1
    // this.dealerCards.push(this.cards[this.deckCount])
    // this.cardsDealt = true;
    // this.handleFlip()
  }



  calculateWinner() {

  }

  handleFlip() {
    this.front?.nativeElement.classList.toggle('flipped')
    this.back?.nativeElement.classList.toggle('flipped')
  }




}
