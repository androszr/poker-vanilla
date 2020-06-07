class CalculateResult {
  constructor(playercards, round) {
    this.round = round;
    this.playercards = playercards;
    this.cardsValue = [];
    this.getCardsValue();
  }
  getCardsValue() {
    for (let card of this.playercards) {
      const cardValue = card.getAttribute('data-value');
      this.cardsValue.push(cardValue);
    }
    this.cardsValue.sort();
    console.log('cards value: ', this.cardsValue);
  }
}

export default CalculateResult;