import { Injectable } from '@angular/core';
import { Card } from 'src/app/interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class PerfectStrategyUtilityService {

  aces: string[] = ["assets/cards/aceOfClubs.png", "assets/cards/aceOfDiamonds.png", "assets/cards/aceOfHearts.png", "assets/cards/aceOfSpades.png"] 

  constructor() { }

  determinePerfectStrat(cards: Card[]): string {

    let cardTotal = 0

    for(let i = 0; i < cards.length; i++) {
      cardTotal += cards[i].cardValue
    }

    switch(true) {
      //Pairs
      case cards[0].cardName === cards[1].cardName: {
        switch(true) {
          case cards[0].cardName.includes('ace'): {
            return 'Pair of aces, always SPLIT'
          }
          case cards[0].cardName.includes('ten'): {
            return 'Pair of 10s, should never SPLIT'
          }
          case cards[0].cardName.includes('nine'): {
            return 'Pair of 9s, 7,10,Ace NO SPLIT - o/w SPLIT'
          }
          case cards[0].cardName.includes('eight'): {
            return 'Pair of 8s, always SPLIT'
          }
          case cards[0].cardName.includes('seven'): {
            return 'Pair of 7s, 2,3,4,5,6,7 SPLIT - 8,9,10,Ace NO SPLIT'
          }
          case cards[0].cardName.includes('six'): {
            return 'Pair of 6s, 2(SPLIT only if DAS is offered), 3,4,5,6 SPLIT - 7,8,9,10 NO SPLIT'
          }
          case cards[0].cardName.includes('five'): {
            return 'Pair of 5s, never SPLIT'
          }
          case cards[0].cardName.includes('four'): {
            return 'Pair of 4s, 5,6 NO SPLIT - o/w SPLIT'
          }
          case cards[0].cardName.includes('three'): {
            return '2, 3(SPLIT only if DAS is offered), 3,4,5,6,7 SPLIT - 8, 9, 10, Ace NO SPLIT'
          }
          case cards[0].cardName.includes('two'): {
            return '2, 3(SPLIT only if DAS is offered), 3,4,5,6,7 SPLIT - 8, 9, 10, Ace NO SPLIT'
          } 
        }
        break;
      }
      
      //Aces
      case this.aces.includes(cards[0].cardName) || this.aces.includes(cards[1].cardName):  {
        if(cards[0].cardName.includes('ace')) {
          switch(true) {
            case cards[1].cardName.includes('nine'): {
              return 'A, 9 - Always stay'
            }
            case cards[1].cardName.includes('eight'): {
              return 'A, 8 - 6 (double if allowed o/w stay) o/w stay'
            }
            case cards[1].cardName.includes('seven'): {
              return 'A, 7 - 2,3,4,5,6 (double if allowed o/w stay) - 7, 8 stay - 9, 10, A hit'
            }
            case cards[1].cardName.includes('six'): {
              return '3,4,5,6 (double) o/w hit'
            }
            case cards[1].cardName.includes('five'): {
              return '4,5,6 (double) o/w hit'
            }
            case cards[1].cardName.includes('four'): {
              return '4,5,6 (double) o/w hit'
            }
            case cards[1].cardName.includes('three'): {
              return '5,6 (double) o/w hit'
            }
            case cards[1].cardName.includes('two'): {
              return '5,6 (double) o/w hit'
            }
          }
        } else {
          switch(true) {
            case cards[0].cardName.includes('nine'): {
              return 'A, 9 - Always stay'
            }
            case cards[0].cardName.includes('eight'): {
              return 'A, 8 - 6 (double if allowed o/w stay) o/w stay'
            }
            case cards[0].cardName.includes('seven'): {
              return 'A, 7 - 2,3,4,5,6 (double if allowed o/w stay) - 7,8 stay - 9,10, A hit'
            }
            case cards[0].cardName.includes('six'): {
              return '3,4,5,6 (double) o/w hit'
            }
            case cards[0].cardName.includes('five'): {
              return '4,5,6 (double) o/w hit'
            }
            case cards[0].cardName.includes('four'): {
              return '4,5,6 (double) o/w hit'
            }
            case cards[0].cardName.includes('three'): {
              return '5,6 (double) o/w hit'
            }
            case cards[0].cardName.includes('two'): {
              return '5,6 (double) o/w hit'
            }
          }
        }
        break;
      }

      //numbers
      case cardTotal >= 17: {
        return 'Always stay on >= 17'
      }
      case cardTotal === 16: {
        return '2,3,4,5,6 stay - 7,8,9,10,A hit'
      }
      case cardTotal === 15: {
        return '2,3,4,5,6 stay - 7,8,9,10,A hit'
      }
      case cardTotal === 14: {
        return '2,3,4,5,6 stay - 7,8,9,10,A hit'
      }
      case cardTotal === 13: {
        return '2,3,4,5,6 stay - 7,8,9,10,A hit'
      }
      case cardTotal === 12: {
        return '4,5,6 stay - o/w hit'
      }
      case cardTotal === 11: {
        return 'Alway DOUBLE'
      }
      case cardTotal === 10: {
        return '10, A hit - o/w DOUBLE'
      }
      case cardTotal === 9: {
        return '3,4,5,6 DOUBLE - o/w hit'
      }
      case cardTotal === 8: {
        return 'Always hit'
      }
    }    
    return ''
  }
}
