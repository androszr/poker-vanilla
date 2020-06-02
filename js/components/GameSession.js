import {classNames, select} from '../settings.js';

class GameSession {
  constructor(gameSessionData) {
    this.data = gameSessionData;
    this.getElements();
    this.initSession();
  }
  getElements() {
    this.startSection = document.querySelector(select.startScreen.startSection);
  }
  initSession() {
    console.log('starting game session: ', this.data);
    this.startSection.classList.add(classNames.startScreen.sectionHide);
  }
}

export default GameSession;