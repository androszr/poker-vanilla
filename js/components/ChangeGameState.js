import {settings, select} from '../settings.js';

class ChangeGameState {
  constructor(gameState) {
    this.gameState = gameState;
    this.getElements();
    this.changeState();
  }
  getElements() {
    this.playerCards = document.querySelectorAll(select.gameScreen.cardSingle);
  }
  changeState() {
    switch(this.gameState) {
      case 0: /* Starting game - reset cards in deck, draw first set of cards */ 
        console.log('case in ChangeGameState Class: ', this.gameState);
        this.cardsInBet = [...settings.allCards];
        //console.log('cards before draw: ', this.cardsInBet, 'player cards: ', this.playerCards);
        for (let card of this.playerCards) {
          this.drawCard(card);
        }
        this.gameState++
        //console.log('cards after draw: ', this.cardsInBet);
        return this.gameState;
      case 1:
        console.log('case', this.gameState);
        return this.gameState;
      case 2:
        console.log('case', this.gameState);
        return this.gameState;
      case 3:
        console.log('case', this.gameState);
        return this.gameState;
    }
  }
  drawCard(card) {
    const cardDigit = card.getAttribute(settings.attributes.dataCard);
    const randomCard = this.cardsInBet[Math.floor(Math.random() * this.cardsInBet.length)];
    const cardIndex = this.cardsInBet.indexOf(randomCard); 
    if (cardIndex > -1) { 
      this.cardsInBet.splice(cardIndex, 1);
    }
    card.setAttribute(settings.attributes.dataValue, randomCard);
    card.innerHTML = settings.cardElement.replace(/\*/g, randomCard).replace('%', cardDigit);
  }
}

export default ChangeGameState;