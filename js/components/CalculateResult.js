import {settings, select, classNames} from '../settings.js';

class CalculateResult {
  constructor(playercards, round) {
    this.round = round;
    this.playercards = playercards;
    this.cardsValue = [];
    this.cardsType = '';
    this.cardsColor = '';
    this.winCombination = 'none';
    this.winTypeCombinations = settings.winCombinations.typeCombinations;
    this.getElements();
    this.getCardsValue();
  }
  getElements() {
    this.dom = {};
    this.dom.pair = document.querySelector(select.pointsGrid.pair);
    this.dom.twoPairs = document.querySelector(select.pointsGrid.twoPairs);
    this.dom.threes = document.querySelector(select.pointsGrid.threes);
    this.dom.fours = document.querySelector(select.pointsGrid.fours);
    this.dom.fullHouse = document.querySelector(select.pointsGrid.fullHouse);
    this.pointsGridCombinations = document.querySelector(select.pointsGrid.pointsGrid).children;
    this.currentBalance = document.querySelector(select.gameScreen.currentBalance);
  }
  getCardsValue() {
    for (let card of this.playercards) {
      const cardValue = card.getAttribute('data-value');
      this.cardsValue.push(cardValue);
    }
    this.cardsValue.sort();
    for (let value of this.cardsValue) {
      this.cardsType = this.cardsType.concat(value.charAt(0));
      this.cardsColor = this.cardsColor.concat(value.charAt(2));
    }
    console.log('cards type:', this.cardsType, 'cards colors:', this.cardsColor, 'cards value:', this.cardsValue);

    for (let combination in this.winTypeCombinations) {
      for (let type of this.winTypeCombinations[combination]) {
        const regex = new RegExp(type);
        if (regex.test(this.cardsType)) {
          if (settings.pointsCombinations[combination] > settings.pointsCombinations[this.winCombination]) {
            this.winCombination = combination;
          }
          //const matchPart = regex.exec(this.cardsType); 
          //console.log('you won something: ', regex, combination, 'matching: ', matchPart[0]);
        }
      }
    }  
    console.log('your final point score is:', settings.pointsCombinations[this.winCombination], 'for:', this.winCombination);
    for (let pointsGrid of this.pointsGridCombinations) {
      pointsGrid.classList.remove(classNames.gameScreen.wonCombination, false);
    }
    if (this.winCombination != 'none') {
      this.dom[this.winCombination].classList.add(classNames.gameScreen.wonCombination);
      this.currentBalanceValue = parseInt(this.currentBalance.innerHTML);
      this.currentBalance.innerHTML = this.currentBalanceValue + settings.pointsCombinations[this.winCombination];
    }
    
  }
  isConsecutive(string) {
    const straightOne = 'ABCDEFGHIJKLM';
    const straightTwo = 'MABCD';
    return (straightOne.includes(string) || straightTwo.includes(string));
  }
}

export default CalculateResult;