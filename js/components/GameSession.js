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
    if (this.gameStateClass) {
      this.currentCardsInBet = this.gameStateClass.cardsInDeck;
    }
    if (this.gameStateClass && this.gameStateClass.gameReset) {
      this.gameState = 0;
    }
    console.log('Game State before doing the move: ', this.gameState);
    this.gameStateClass = new ChangeGameState(this.gameState, this.currentCardsInBet);
    this.gameState++;
    console.log('Game State after doing the move: ', this.gameState, 'of class: ', this.gameStateClass);
  }
}

export default GameSession;