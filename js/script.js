{
  'use strict';

  class GameStart {
    constructor(gameData) {
      this.data = gameData;
      this.renderPlayers();
    }
    renderPlayers() {
      console.log('Game data: ', this.data);
    }
  }
  const app = {
    
    initData: function(){
      this.data = {};
      fetch('../db/data.json')
        .then(response => response.json())
        .then(data => {
          this.data = data;
          new GameStart(this.data);
        });
    },
    init: function(){
      console.log('*** Poker App starting ***', this);
      this.initData();
    }
  }
  app.init();

}