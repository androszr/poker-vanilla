
import GameInit from './components/GameInit.js';

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
