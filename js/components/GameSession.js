import {select, classNames} from '../settings.js';

class GameSession {
  constructor(gameSessionData) {
    this.data = gameSessionData;
    this.getElements();
    this.initSession();
  }
  getElements() {
    this.startSection = document.querySelector(select.startScreen.startSection);
    this.gameSection = document.querySelector(select.gameScreen.gameSection);
  }
  initSession() {
    console.log('starting game session: ', this.data);
    window.location.hash = '/' + this.gameSection.id;

    this.startSection.classList.remove(classNames.global.sectionShow, false);
    this.gameSection.classList.add(classNames.global.sectionShow);
  }
}

export default GameSession;