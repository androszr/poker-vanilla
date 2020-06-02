{
  'use strict';

  const select = {
    startScreen: {
      startSection: '.start',
      inputName: '.player-name-input',
      consentField: '.terms-condition',
      submitButton: '.start-game-form [type="submit"]',
      avatarChoice: '.avatar-choice',
      avatarAvatar: '.avatar-details',
      allAvatars: '.avatar',
      activeAvatar: '.avatar-active',
      currentBalance: '.balance-current p',
    },
    
  };

  const classNames = {
    startScreen: {
      activeAvatar: 'avatar-active',
      alertShow: 'input-alert-show',
      sectionHide: 'section-hide',
    },
  }

  const settings = {
    validate: {
      name: {
        regex: /^[a-zA-Z0-9]{2,}$/,
        errorAlertField: '.name-alert',
      },
      avatars: {
        errorAlertField: '.avatar-alert',
      },
      consent: {
        errorAlertField: '.consent-alert',
      }
    }
  }

  const templates = {
    avatarChoice: Handlebars.compile(document.querySelector('#template-avatar-choice').innerHTML),
  }

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
    };
    renderAvatars() {
      console.log('Game data: ', this.data);
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
    };
    avatarChoice(avatarId) {
      this.currentActiveAvatar = document.querySelector(select.startScreen.activeAvatar);
      if (this.currentActiveAvatar) {
        this.currentActiveAvatar.classList.remove(classNames.startScreen.activeAvatar, false)
      }
      this.currentActiveAvatarId = avatarId;
      this.currentActiveAvatar = this.elements.avatar.querySelector('.'+this.currentActiveAvatarId);   
      this.currentActiveAvatar.classList.add(classNames.startScreen.activeAvatar);
      this.validateAvatar();
    };
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
    };
    validateName() {
      const nameRegex = new RegExp(settings.validate.name.regex);
      if (nameRegex.test(this.elements.name.value)) {
        this.elements.nameError.classList.remove(classNames.startScreen.alertShow, false);
        return true;
      } else {
        this.elements.nameError.classList.add(classNames.startScreen.alertShow);
        return false;
      }
    };
    validateAvatar() {
      if (this.currentActiveAvatar) {
        this.elements.avatarError.classList.remove(classNames.startScreen.alertShow, false);
        return true;
      } else {
        this.elements.avatarError.classList.add(classNames.startScreen.alertShow);
        return false;
      }
    };
    validateConsent() {
      if (this.elements.consent.checked) {
        this.elements.consentError.classList.remove(classNames.startScreen.alertShow, false);
        return true;
      } else {
        this.elements.consentError.classList.add(classNames.startScreen.alertShow);
        return false;
      }
    };
    validate() {
      const validateName = this.validateName();
      const validateAvatar = this.validateAvatar();
      const validateConsent = this.validateConsent();
      if (!validateName || !validateAvatar || !validateConsent) {
        return false;
      } else {
        return true;
      }
      
    };
    initGame() {
      if (!this.validate()) {
        return;
      }
      this.gameSessionData = {};
      this.gameSessionData.name = this.elements.name.value;
      this.gameSessionData.avatar = this.currentActiveAvatarId;
      console.log('validate passed', this.gameSessionData);
      new GameSession(this.gameSessionData);
    };
  }

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
    };
  }
  const app = {
    initData: function(){
      this.data = {};
      fetch('../db/data.json')
        .then(response => response.json())
        .then(data => {
          this.data = data;
          new GameInit(this.data);
        });
    },
    init: function(){
      console.log('*** Poker App starting ***', this);
      this.initData();
    }
  }
  app.init();

}