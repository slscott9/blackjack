import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Card, cards } from 'src/app/interfaces/types';
import { GameUtilityService } from 'src/app/services/utility/game/game-utility.service';
import { PerfectStrategyUtilityService } from 'src/app/services/utility/perfect-strategy/perfect-strategy-utility.service';
import { PerfectStrategyComponent } from '../perfect-strategy/perfect-strategy.component';
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

  playerWinMessage: string = ''
  dealerWinMessage: string = ''

  showPlayerCardCount: boolean = false;
  showDealerCardCount: boolean = false;
  showCardCount: boolean = false;

  cardCount: number = 0;

  perfectStratMessage: string = ''
  showPerfectStrat: boolean = false;

  @ViewChild('front')
  front!: ElementRef;

  @ViewChild('back')
  back!: ElementRef;


  constructor(
    private perfectStrategyUtility: PerfectStrategyUtilityService
  ) { 
  }

  ngOnInit(): void {
    this.shuffle()
    this.startGame()
  }

  ngAfterViewInit(): void {
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
      this.calculateCount(this.cards[this.deckCount])
    }
  }

  addPlayerCard() {
    this.perfectStratMessage = ''
    this.incremnetDeckCount(); //needs work since last card will shuffle automatically
    this.playerCards.push(this.cards[this.deckCount]);
    this.playerWinMessage = this.determineWinner(this.playerCards)

  }

  addDealerCard() {
    this.incremnetDeckCount(); //needs work since last card will shuffle automatically
    this.dealerCards.push(this.cards[this.deckCount]);
    this.dealerWinMessage = this.determineWinner(this.dealerCards)
  }

  togglePlayerCardCount() {
    this.showPlayerCardCount = !this.showPlayerCardCount
  }

  toggleDealerCardCount() {
    this.showDealerCardCount = !this.showDealerCardCount
  }

  calculateHandCount(card: Card[]) {
    let cardCount = 0;

    for (let i = 0; i < card.length; i++) {
      cardCount += card[i].cardValue
    }

    return cardCount;
  }

  startGame() {
    this.deckCount += 1
    this.calculateCount(this.cards[this.deckCount])
    this.playerCards.push(this.cards[this.deckCount])
    this.deckCount += 1
    this.calculateCount(this.cards[this.deckCount])
    this.dealerCards.push(this.cards[this.deckCount])
    this.deckCount += 1
    this.calculateCount(this.cards[this.deckCount])
    this.playerCards.push(this.cards[this.deckCount])
  }

  dealCards() {
    this.playerCards = []
    this.dealerCards = []   
    this.deckCount += 1
    this.calculateCount(this.cards[this.deckCount])
    this.playerCards.push(this.cards[this.deckCount])
    this.deckCount += 1
    this.calculateCount(this.cards[this.deckCount])
    this.dealerCards.push(this.cards[this.deckCount])
    this.deckCount += 1
    this.calculateCount(this.cards[this.deckCount])
    this.playerCards.push(this.cards[this.deckCount])
    this.dealerWinMessage = ''
    this.playerWinMessage = ''
  }

  handleFlip() {
    this.front?.nativeElement.classList.toggle('flipped')
    this.back?.nativeElement.classList.toggle('flipped')
  }

  determineWinner(cards: Card[]): string {
    let cardCount = this.calculateHandCount(cards);

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

  getPerfectStrategy(cards: Card[]) {
    return this.perfectStrategyUtility.determinePerfectStrat(cards)

  }

  togglePerfectStrat() {
    this.showPerfectStrat = !this.showPerfectStrat
  }


  toggleCardCount() {
    this.showCardCount = !this.showCardCount;
  }


  calculateCount(card: Card) {
    switch(true) {
      case card.cardName.includes('ace') || card.cardValue === 10: {
        this.cardCount -= 1;
        break;
      }
      case card.cardValue >= 2 && card.cardValue < 6: {
        this.cardCount += 1
        break;
      }
    }
  }

  getCardCount() {
    return this.cardCount
  }



}
