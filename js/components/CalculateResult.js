import {settings} from '../settings.js';

class CalculateResult {
  constructor(playercards, round) {
    this.round = round;
    this.playercards = playercards;
    this.cardsValue = [];
    this.cardsType = '';
    this.cardsColor = '';
    this.winTypeCombinations = settings.winCombinations.typeCombinations;
    this.getElements();
    this.getCardsValue();
  }
  getElements() {
  }
  getCardsValue() {
    for (let card of this.playercards) {
      const cardValue = card.getAttribute('data-value');
      this.cardsValue.push(cardValue);
    }
    this.cardsValue.sort();
    console.log('cards value: ', this.cardsValue);
    for (let value of this.cardsValue) {
      this.cardsType = this.cardsType.concat(value.charAt(0));
      this.cardsColor = this.cardsColor.concat(value.charAt(2));
    }
    console.log('cards type: ', this.cardsType, 'cards colors: ', this.cardsColor);

    for (let combination in this.winTypeCombinations) {
      for (let type of this.winTypeCombinations[combination]) {
        const regex = new RegExp(type);
        if (regex.test(this.cardsType)) {
          console.log('you got: ', combination);
          const matchPart = regex.exec(this.cardsType); 
          console.log('you won something: ', regex, combination, 'matching: ', matchPart[0]);
        }
      }
    }  
  }
}

export default CalculateResult;