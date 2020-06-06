import {select, classNames, settings} from '../settings.js';
import ChangeGameState from '../components/ChangeGameState.js';

class GameSession {
  constructor(gameSessionData) {
    this.data = gameSessionData;
    this.getElements();
    this.initSession();
    this.initActions();
    this.gameState = 0;
  }
  getElements() {
    this.startSection = document.querySelector(select.startScreen.startSection);
    this.gameSection = document.querySelector(select.gameScreen.gameSection);
    this.avatarImgSection = document.querySelector(select.global.avatarImgWrapper);
    this.nameSection = document.querySelector(select.global.nameWrapper);
    this.playWrapper = document.querySelector(select.gameScreen.playWrapper);
    this.playerCards = document.querySelector(select.gameScreen.cardGrid).children;
    this.choiceOptions = document.querySelectorAll(select.gameScreen.choiceAll);
  }
  initSession() {
    console.log('starting game session: ', this.data);
    window.location.hash = '/' + this.gameSection.id;
    this.startSection.classList.remove(classNames.global.sectionShow, false);
    this.gameSection.classList.add(classNames.global.sectionShow);
    this.setPlayer();
  }
  setPlayer() {
    this.nameSection.innerHTML = this.data.name;
    this.nameSection.classList.add(classNames.global.playerShow);
    this.avatarImgSection.src = this.avatarImgSection.src.replace(settings.default.playerAvatar, this.data.avatar);
    this.avatarImgSection.parentElement.classList.add(classNames.global.playerShow);
  }
  initActions() {
    this.playWrapper.addEventListener('click', () => {
      event.preventDefault();
      this.playWrapperClicked('Space');
    });
    document.addEventListener('keydown', (e) => {
      const cardOptions = settings.cardOptions;
      if (cardOptions.includes(e.code)) {
        const choiceDigit = e.code.charAt(e.code.length - 1);
        this.chooseCard(choiceDigit);
      } else if (e.code=='Space' || e.code=='Enter') {
        this.playWrapperClicked(e.code);
      }
    });
    for (let option of this.choiceOptions) {
      option.addEventListener('click', () => {
        const choiceDigit = event.target.getAttribute(settings.attributes.dataCard); 
        this.chooseCard(choiceDigit);
      });
    }
    for (let card of this.playerCards) {
      card.addEventListener('click', () => {
        const choiceDigit = card.getAttribute(settings.attributes.dataCard); 
        this.chooseCard(choiceDigit);
      });
    }
  }
  playWrapperClicked(code) {
    if (code=='Enter' || code=='Space') {
      this.playWrapper.classList.toggle(classNames.gameScreen.clickedPlayCard);
      setTimeout(() => { 
        this.playWrapper.classList.toggle(classNames.gameScreen.clickedPlayCard);
      }, 200);
      this.gameMove();
      //this.bet();
    }
  }
  chooseCard(digit) {
    if (this.gameState== 1) {
      const choosenCard = document.querySelector('.card-grid [data-card="'+ digit +'"]');
      const choiceOption = document.querySelector('.choice-grid [data-card="'+ digit +'"]');
      choiceOption.classList.toggle(classNames.gameScreen.clickedChoiceCard);
      choosenCard.classList.toggle(classNames.gameScreen.choosenCard);
    }
  }

  gameMove() {
    console.log('Game State before doing the move: ', this.gameState);
    this.gameStateClass = new ChangeGameState(this.gameState);
    this.gameState = this.gameStateClass.gameState;
    console.log('Game State after doing the move: ', this.gameState, 'of class: ', this.gameStateClass);
  }

  bet() {
    if (this.gameState ==3) {
      this.resetBet();
    } else if (this.gameState == 1) {
      this.temporaryState();
    }
    else {
    if (this.gameState==0) {
      this.resetCards();
    }   
    if(this.gameState == 0 || this.gameState == 2) {
      /* remove choosen cards from allCards */ 
      this.removeChoosenCardsFromBet();
      console.log('currently in deck:', this.cardsInBet.length);
      for (let card of this.playerCards) {
        const cardDigit = this.getCardDigit(card);
        if (!card.classList.contains(classNames.gameScreen.choosenCard)) {
          const randomCard = this.cardsInBet[Math.floor(Math.random() * this.cardsInBet.length)];
          const cardIndex = this.cardsInBet.indexOf(randomCard); 
          if (cardIndex > -1) { 
            this.cardsInBet.splice(cardIndex, 2);
          }
          card.setAttribute(settings.attributes.dataValue, randomCard);
          card.setAttribute(settings.attributes.dataIndex, cardIndex);
          card.innerHTML = settings.cardElement.replace(/\*/g, randomCard).replace('%', cardDigit);
        }
        if (this.gameState == 2) {
          card.classList.add(classNames.gameScreen.choosenCard);
        }
      }
      if (this.gameState == 2) {
        for (let choice of this.choiceOptions) {
          choice.classList.remove(classNames.gameScreen.clickedChoiceCard, false);
          const choiceText = choice.querySelector('p');
          choiceText.classList.toggle(classNames.gameScreen.textHide);
        }
      }
      this.gameState++
    }
  } 
      
  }
  getCardDigit(card) {
    const choiceDigit = card.getAttribute(settings.attributes.dataCard); 
    return choiceDigit;
  }
  removeChoosenCardsFromBet() {
    for (let card of this.playerCards) {
      if (card.classList.contains(classNames.gameScreen.choosenCard)) {
        const cardIndex = card.getAttribute(settings.attributes.dataIndex); 
        if (cardIndex > -1) { 
          this.cardsInBet.slice(cardIndex, 1);
        }
      }
    }
  }
  resetBet() {
    for (let card of this.playerCards) {
      card.setAttribute(settings.attributes.dataValue, '0');
      card.setAttribute(settings.attributes.dataIndex, '-1');
      card.innerHTML = settings.cardDefault;
      card.classList.remove(classNames.gameScreen.choosenCard, false);
    }
    for (let choice of this.choiceOptions) {
      const choiceText = choice.querySelector('p');
      choiceText.classList.toggle(classNames.gameScreen.textHide);
      choice.classList.remove(classNames.gameScreen.clickedChoiceCard, false);
    }
    this.gameState = 0;
  }
  resetCards() {
    this.cardsInBet = [...settings.allCards];
  }
  temporaryState() {
    for (let card of this.playerCards) {
      if (!card.classList.contains(classNames.gameScreen.choosenCard)) {
        card.innerHTML = settings.cardDefault;
      }
    }
    this.gameState++;
    setTimeout(() => { 
      this.bet();
    }, 500);
    
  }
}

export default GameSession;