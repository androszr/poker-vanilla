{
  'use strict';

  const select = {
    startScreen: {
      inputName: '.player-name-input',
      consentField: '.terms-condition',
      submitButton: '.start-game-form [type="submit"]',
      playersChoice: '.player-choice',
      playerAvatar: '.player-details',
      allPlayers: '.player',
      activePlayer: '.player-active',
      currentBalance: '.balance-current p',
    },
    
  };

  const classNames = {
    startScreen: {
      activePlayer: 'player-active',
      alertShow: 'input-alert-show',
    },
  }

  const settings = {
    validate: {
      name: {
        regex: /^[a-zA-Z0-9]{2,}$/,
        errorAlertField: '.name-alert',
      },
      players: {
        errorAlertField: '.player-alert',
      },
      consent: {
        errorAlertField: '.consent-alert',
      }
    }
  }

  const templates = {
    playerChoice: Handlebars.compile(document.querySelector('#template-player-choice').innerHTML),
  }

  class GameInit {
    constructor(gameData) {
      this.data = gameData;
      this.currentActivePlayer = '';
      this.renderPlayers();
      this.getElements();
      this.initActions();
    }
    getElements() {
      this.elements = {};
      this.elements.name = document.querySelector(select.startScreen.inputName);
      this.elements.consent = document.querySelector(select.startScreen.consentField);
      this.elements.formSubmit = document.querySelector(select.startScreen.submitButton);
      this.elements.players = document.querySelector(select.startScreen.playersChoice);
      this.elements.allPlayers = document.querySelectorAll(select.startScreen.allPlayers);

      this.elements.nameError = document.querySelector(settings.validate.name.errorAlertField);
      this.elements.playerError = document.querySelector(settings.validate.players.errorAlertField);
      this.elements.consentError = document.querySelector(settings.validate.consent.errorAlertField);
    };
    renderPlayers() {
      console.log('Game data: ', this.data);
      for (let player in this.data.players) {
        const generatedHTML = templates.playerChoice(this.data.players[player]);
        const targetElement = document.querySelector(select.startScreen.playersChoice);
        targetElement.insertAdjacentHTML('beforeend', generatedHTML);
        const playerBox = document.querySelector('.'+this.data.players[player].id)

        playerBox.addEventListener('click', () => {
          event.preventDefault();
          this.playerChoice(this.data.players[player].id);
        });
      }
    };
    playerChoice(playerId) {
      this.currentActivePlayer = document.querySelector(select.startScreen.activePlayer);
      if (this.currentActivePlayer) {
        this.currentActivePlayer.classList.remove(classNames.startScreen.activePlayer, false)
      }
      this.currentActivePlayer = this.elements.players.querySelector('.'+playerId);
      this.currentActivePlayer.classList.add(classNames.startScreen.activePlayer);
    };
    initActions() {
      this.elements.formSubmit.addEventListener('click', () => {
        event.preventDefault();
        this.initGame();
      });
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
    validatePlayer() {
      if (this.currentActivePlayer) {
        this.elements.playerError.classList.remove(classNames.startScreen.alertShow, false);
        return true;
      } else {
        this.elements.playerError.classList.add(classNames.startScreen.alertShow);
        return false;
      }
    };
    validateConsent() {

    };
    validate() {
      const validateName = this.validateName();
      const validatePlayer = this.validatePlayer();
      if (!validateName || !validatePlayer) {
        return false;
      } else {
        return true;
      }
      
    };
    initGame() {
      console.log('current elements: ', this.elements);
      console.log('current active player: ', this.currentActive);
      if (!this.validate()) {
        return;
      }
      console.log('validate passed');
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