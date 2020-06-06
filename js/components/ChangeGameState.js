import {settings, select, classNames} from '../settings.js';

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
  }

  changeState() {
    switch(this.gameState) {
      case 0: /* Starting game - reset cards in deck, draw first set of cards */ 
        console.log('case in ChangeGameState Class: ', this.gameState);
        this.cardsInDeck = [];
        this.cardsInDeck = [...settings.allCards];
        //console.log('cards before draw: ', this.cardsInDeck, 'player cards: ', this.playerCards);
        for (let card of this.playerCards) {
          this.drawCard(card);
        }
        this.choiceTextToggle();
        //console.log('cards after draw: ', this.cardsInDeck);
        return;
      case 1:
        console.log('case in ChangeGameState Class: ', this.gameState, 'in deck: ', this.cardsInDeck);
        for (let card of this.playerCards) {
          if (!card.classList.contains(classNames.gameScreen.choosenCard)) {
            card.innerHTML = settings.cardDefault;
          }
        }
        this.choiceTextToggle();
        setTimeout(() => { 
          for (let card of this.playerCards) {
            if (!card.classList.contains(classNames.gameScreen.choosenCard)) {
              this.drawCard(card);
            }
          }
          setTimeout(() => { 
            for (let card of this.playerCards) {
              card.classList.add(classNames.gameScreen.choosenCard);
            }
            this.choiceColorToggle();
          }, 500);
        }, 500);
        
        return;
      case 2:
        console.log('case in ChangeGameState Class: ', this.gameState);
        return;
      case 3:
        console.log('case in ChangeGameState Class: ', this.gameState);
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
  choiceColorToggle() {
    for (let choice of this.choiceOptions) {
      choice.classList.add(classNames.gameScreen.clickedChoiceCard);
    }
  }
}

export default ChangeGameState;