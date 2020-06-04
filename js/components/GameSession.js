import {select, classNames, settings} from '../settings.js';

class GameSession {
  constructor(gameSessionData) {
    this.data = gameSessionData;
    this.getElements();
    this.initSession();
  }
  getElements() {
    this.startSection = document.querySelector(select.startScreen.startSection);
    this.gameSection = document.querySelector(select.gameScreen.gameSection);
    this.avatarImgSection = document.querySelector(select.global.avatarImgWrapper);
    this.nameSection = document.querySelector(select.global.nameWrapper);
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
}

export default GameSession;