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
    this.dom.straight = document.querySelector(select.pointsGrid.straight);
    this.dom.flush = document.querySelector(select.pointsGrid.flush);
    this.dom.straightFlush = document.querySelector(select.pointsGrid.straightFlush);
    this.dom.royalFlush = document.querySelector(select.pointsGrid.royalFlush);
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
    this.checkStraight(); // 20 points
    this.checkFlush(); // 30 points
    this.checkStraightFlush(); // 250 points
    this.checkTypesCombinations();
    this.checkRoyalFlush(); // 4000 points
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
  checkFlush() {
    const regex = new RegExp(settings.winCombinations.colorCombinations.flush);
    if (regex.test(this.cardsColor)) {
      this.winCombination = 'flush';
      this.colorMatch = true;
    }
  }
  checkStraight() {
    const straight = this.isConsecutive(this.cardsType);
    if (straight == true) {
      this.winCombination = 'straight';
      this.straightMatch = true
    }
  }
  checkStraightFlush() {
    if (this.colorMatch && this.straightMatch) {
      this.winCombination = 'straightFlush'; 
    }
  }
  checkRoyalFlush() {
    const royal = this.isRoyalConsecutive(this.cardsType);
    if (royal == true && this.colorMatch == true) {
      this.winCombination = 'royalFlush';
    }
  }
  checkTypesCombinations() {
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
  }
  isConsecutive(string) {
    const straightOne = 'ABCDEFGHIJKLM';
    const straightTwo = 'MABCD';
    return (straightOne.includes(string) || straightTwo.includes(string));
  }
  isRoyalConsecutive(string) {
    console.log(string);
    const royal = 'IJKLM';
    return (royal.includes(string));
  }
}

export default CalculateResult;