
import GameInit from './components/GameInit.js';
import { classNames, select, settings } from './settings.js';

const app = {
  initPages: function() {
    this.pages = document.querySelectorAll(select.global.allSections);
    this.startPage = document.querySelector(select.startScreen.startSection);
    const idFromHash = window.location.hash.replace('#/', '');
    let ShowPage = this.startPage; 
    if (idFromHash != 'game' && !this.data.name) {
      for (let page of this.pages) {
        if (page.id==idFromHash) {
          ShowPage = page;
          break;
        }
      }
    }
    
    ShowPage.classList.add(classNames.global.sectionShow);
    window.location.hash = '/' + ShowPage.id;

  },
  initData: function(){
    this.data = {};
    const url = settings.db.url + '/avatars';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.data = data;
        new GameInit(this.data);
      });
  },
  init: function(){
    console.log('*** Poker App starting ***', this);
    this.initData();
    this.initPages();
    /* Temporary 
    this.gameSessionData = {};
    this.gameSessionData.name = 'Rob';
    this.gameSessionData.avatar = 'player-one';
    // Game Balance 
    this.gameSessionData.balance = 500;
    new GameSession(this.gameSessionData);
     */
  }
}
app.init();
