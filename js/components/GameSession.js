import {select, classNames, settings} from '../settings.js';

class GameSession {
  constructor(gameSessionData) {
    this.data = gameSessionData;
    this.getElements();
    this.initSession();
    this.initActions();
    this.gameStart = false;
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
        const classList = event.target.className.split(' ');
        const choiceDigit = classList[1].replace('choice-', '')
        this.chooseCard(choiceDigit);
      });
    }
    for (let card of this.playerCards) {
      card.addEventListener('click', () => {
        const classList = event.target.className.split(' ');
        const choiceDigit = classList[1].replace('card-', '');
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
      this.bet();
    }
  }
  chooseCard(digit) {
    if (this.gameStart) {
      const choiceOption = document.querySelector(select.gameScreen.choiceCard.replace('*', digit));
      const choosenCard = document.querySelector(select.gameScreen.card.replace('*', digit));
      choiceOption.classList.toggle(classNames.gameScreen.clickedChoiceCard);
      choosenCard.classList.toggle(classNames.gameScreen.choosenCard);
    }
  }
  bet() {
    this.gameStart = true;
    this.cardsInBet = [...settings.allCards];
    /* remove choosen cards from allCards */ 
    console.log('cards before removing choosen: ', this.cardsInBet);
    this.removeChoosenCardsFromBet();
    console.log('cards after removing choosen: ', this.cardsInBet);
    for (let card of this.playerCards) {
      const cardDigit = this.getCardDigit(card);
      if (!card.classList.contains(classNames.gameScreen.choosenCard)) {
        const randomCard = this.cardsInBet[Math.floor(Math.random() * this.cardsInBet.length)];
        const cardIndex = this.cardsInBet.indexOf(randomCard); 
        if (cardIndex > -1) { 
          this.cardsInBet.splice(cardIndex, 1);
        }
        card.setAttribute('data-value', randomCard);
        card.innerHTML = settings.cardElement.replace(/\*/g, randomCard).replace('%', cardDigit);
      }
    }
  }
  getCardDigit(card) {
    const classList = card.className.split(' ');
    const choiceDigit = classList[1].replace('card-', '');
    return choiceDigit;
  }
  removeChoosenCardsFromBet() {
    for (let card of this.playerCards) {
      if (card.classList.contains(classNames.gameScreen.choosenCard)) {
        console.log('this card is chosen: ', card);
        const cardIndex = this.cardsInBet.indexOf(card.getAttribute('data-value')); 
        if (cardIndex > -1) { 
          this.cardsInBet.splice(cardIndex, 1);
        }
      }
    }
  }
}

export default GameSession;