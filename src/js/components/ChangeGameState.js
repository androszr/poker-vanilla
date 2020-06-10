import {settings, select, classNames} from '../settings.js';
import CalculateResult from './CalculateResult.js';

class ChangeGameState {
  constructor(gameState, cardsInDeck) {
    this.gameState = gameState;
    this.cardsInDeck = cardsInDeck;
    this.getElements();
    this.changeState();
  }
  
  getElements() {
    this.playerCards = document.querySelectorAll(select.gameScreen.cardSingle);
    this.choiceOptions = document.querySelectorAll(select.gameScreen.choiceAll);
    this.currentBalance = document.querySelector(select.gameScreen.currentBalance);
  }

  changeState() {
    switch(this.gameState) {
      case 0: /* Starting game - reset cards in deck, draw first set of cards */ 
        //console.log('case in ChangeGameState Class: ', this.gameState);
        this.currentBalanceValue = parseInt(this.currentBalance.innerHTML);
        this.currentBalance.innerHTML = this.currentBalanceValue - 5;
        this.choiceColorRemove();
        this.cardsInDeck = [];
        this.cardsInDeck = [...settings.allCards];
        //console.log('cards before draw: ', this.cardsInDeck, 'player cards: ', this.playerCards);
        this.delayTime = 50;
        for (let card of this.playerCards) {
          card.classList.remove(classNames.gameScreen.choosenCard, false);
          setTimeout(() => { 
          this.drawCard(card);
          }, this.delayTime);
          this.delayTime = this.delayTime + 50;
        }
        this.choiceTextToggle();
        //console.log('cards after draw: ', this.cardsInDeck);
        return;
      case 1:
        //console.log('case in ChangeGameState Class: ', this.gameState, 'in deck: ', this.cardsInDeck);
        for (let card of this.playerCards) {
          if (!card.classList.contains(classNames.gameScreen.choosenCard)) {
            card.innerHTML = settings.cardDefault;
          }
        }
        this.choiceTextToggle();
        setTimeout(() => { 
          this.delayTime = 50;
          for (let card of this.playerCards) {
            if (!card.classList.contains(classNames.gameScreen.choosenCard)) {
              setTimeout(() => { 
              this.drawCard(card);
            }, this.delayTime);
            this.delayTime = this.delayTime + 50;
            }
          }
          setTimeout(() => { 
            for (let card of this.playerCards) {
              card.classList.add(classNames.gameScreen.choosenCard);
            }
            this.choiceColorAdd();
            new CalculateResult(this.playerCards, 2); 
          }, 500);
        }, 500);     
        return;
      case 2:
        this.gameReset = true;
        for (let card of this.playerCards) {
          card.setAttribute(settings.attributes.dataValue, '0');
          card.innerHTML = settings.cardDefault;
          card.classList.remove(classNames.gameScreen.choosenCard, false);
        }
        this.choiceColorRemove();
        //console.log('case in ChangeGameState Class: ', this.gameState);
        return;
    }
  }

  drawCard(card) {
    const cardDigit = card.getAttribute(settings.attributes.dataCard);
    const randomCard = this.cardsInDeck[Math.floor(Math.random() * this.cardsInDeck.length)];
    const cardIndex = this.cardsInDeck.indexOf(randomCard); 
    if (cardIndex > -1) { 
      this.cardsInDeck.splice(cardIndex, 1);
    }
    card.setAttribute(settings.attributes.dataValue, randomCard);
    card.innerHTML = settings.cardElement.replace(/\*/g, randomCard).replace('%', cardDigit);
  }

  choiceTextToggle() {
    for (let choice of this.choiceOptions) {
      const choiceText = choice.querySelector('p');
      choiceText.classList.toggle(classNames.gameScreen.textShow);
    }
  }
  choiceColorAdd() {
    for (let choice of this.choiceOptions) {
      choice.classList.add(classNames.gameScreen.clickedChoiceCard);
    }
  }
  choiceColorRemove() {
    for (let choice of this.choiceOptions) {
      choice.classList.remove(classNames.gameScreen.clickedChoiceCard, false);
    }
  }
}

export default ChangeGameState;