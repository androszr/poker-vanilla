import {settings, classNames, select, templates} from '../settings.js';
import GameSession from '../components/GameSession.js';

class GameInit {
  constructor(gameData) {
    this.data = gameData;
    this.currentActiveAvatar = '';
    this.renderAvatars();
    this.getElements();
    this.initActions();
  }
  getElements() {
    this.elements = {};
    this.elements.name = document.querySelector(select.startScreen.inputName);
    this.elements.consent = document.querySelector(select.startScreen.consentField);
    this.elements.formSubmit = document.querySelector(select.startScreen.submitButton);
    this.elements.avatar = document.querySelector(select.startScreen.avatarChoice);
    this.elements.allAvatars = document.querySelectorAll(select.startScreen.allAvatars);

    this.elements.nameError = document.querySelector(settings.validate.name.errorAlertField);
    this.elements.avatarError = document.querySelector(settings.validate.avatars.errorAlertField);
    this.elements.consentError = document.querySelector(settings.validate.consent.errorAlertField);
  }
  renderAvatars() {
    for (let avatar in this.data.avatars) {
      const generatedHTML = templates.avatarChoice(this.data.avatars[avatar]);
      const targetElement = document.querySelector(select.startScreen.avatarChoice);
      targetElement.insertAdjacentHTML('beforeend', generatedHTML);

      const avatarBox = document.querySelector('.'+this.data.avatars[avatar].id)
      avatarBox.addEventListener('click', () => {
        event.preventDefault();
        this.avatarChoice(this.data.avatars[avatar].id);
      });
    }
  }
  avatarChoice(avatarId) {
    this.currentActiveAvatar = document.querySelector(select.startScreen.activeAvatar);
    if (this.currentActiveAvatar) {
      this.currentActiveAvatar.classList.remove(classNames.startScreen.activeAvatar, false)
    }
    this.currentActiveAvatarId = avatarId;
    this.currentActiveAvatar = this.elements.avatar.querySelector('.'+this.currentActiveAvatarId);   
    this.currentActiveAvatar.classList.add(classNames.startScreen.activeAvatar);
    this.validateAvatar();
  }
  initActions() {
    this.elements.formSubmit.addEventListener('click', () => {
      event.preventDefault();
      this.initGame();
    });
    this.elements.consent.addEventListener('change', () => {
      this.validateConsent();
    });
    this.elements.name.addEventListener('change', () => {
      this.validateName();
    })
  }
  validateName() {
    const nameRegex = new RegExp(settings.validate.name.regex);
    if (nameRegex.test(this.elements.name.value)) {
      this.elements.nameError.classList.remove(classNames.startScreen.alertShow, false);
      return true;
    } else {
      this.elements.nameError.classList.add(classNames.startScreen.alertShow);
      return false;
    }
  }
  validateAvatar() {
    if (this.currentActiveAvatar) {
      this.elements.avatarError.classList.remove(classNames.startScreen.alertShow, false);
      return true;
    } else {
      this.elements.avatarError.classList.add(classNames.startScreen.alertShow);
      return false;
    }
  }
  validateConsent() {
    if (this.elements.consent.checked) {
      this.elements.consentError.classList.remove(classNames.startScreen.alertShow, false);
      return true;
    } else {
      this.elements.consentError.classList.add(classNames.startScreen.alertShow);
      return false;
    }
  }
  validate() {
    const validateName = this.validateName();
    const validateAvatar = this.validateAvatar();
    const validateConsent = this.validateConsent();
    if (!validateName || !validateAvatar || !validateConsent) {
      return false;
    } else {
      return true;
    } 
  }
  initGame() {
    if (!this.validate()) {
      return;
    }
    this.gameSessionData = {};
    this.gameSessionData.name = this.elements.name.value;
    this.gameSessionData.avatar = this.currentActiveAvatarId;
    /* Game Balance for now set to 500 as default */ 
    this.gameSessionData.balance = 500;
    new GameSession(this.gameSessionData);
  }
}

export default GameInit;