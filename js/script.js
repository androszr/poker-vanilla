{
  'use strict';

  const select = {
    startScreen: {
      playersChoice: '.player-choice',
      inputName: '.player-name-input',
      inputEmail: '.player-email-input',
      submitButton: '.start-game-form [type="submit"]'
    },
    
  };

  const classNames = {

  }

  const settings = {

  }

  const utils = {};

  utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;

};

  const templates = {
    playerChoice: Handlebars.compile(document.querySelector('#template-player-choice').innerHTML),
  }

  class GameInit {
    constructor(gameData) {
      this.data = gameData;
      this.renderPlayers();
    }
    renderPlayers() {
      console.log('Game data: ', this.data);
      for (let player in this.data.players) {
        console.log(this.data.players[player]);

        const generatedHTML = templates.playerChoice(this.data.players[player]);
        this.element = utils.createDOMFromHTML(generatedHTML);
        const targetElement = document.querySelector(select.startScreen.playersChoice);
        targetElement.appendChild(this.element);

      }
    }
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