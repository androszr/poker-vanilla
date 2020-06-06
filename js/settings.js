export const select = {
  global: {
    allSections: 'section',
    avatarImgWrapper: '.player-details img',
    nameWrapper: '.player-name',
  },
  startScreen: {
    startSection: '#start',
    inputName: '.player-name-input',
    consentField: '.terms-condition',
    form: '.start-game-form',
    submitButton: '.start-game-form [type="submit"]',
    avatarChoice: '.avatar-choice',
    avatarAvatar: '.avatar-details',
    allAvatars: '.avatar',
    activeAvatar: '.avatar-active',
    currentBalance: '.balance-current p',
  },
  gameScreen: {
    cardGrid: '.card-grid',
    cardSingle: '.card',
    gameSection: '#game',
    playWrapper: '.play-cards',
    choiceCard: '.choice-*',
    choiceAll: '.choice',
    card: '.card-*',
  }
  
};

export const classNames = {
  global: {
    sectionShow: 'section-active',
    playerShow: 'player-show',
  },
  startScreen: {
    activeAvatar: 'avatar-active',
    alertShow: 'input-alert-show',
  },
  gameScreen: {
    clickedPlayCard: 'clicked-play-card',
    clickedChoiceCard: 'choice-active',
    choosenCard: 'card-choosen',
    textShow: 'text-show',
  },
}

export const settings = {
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
  },
  default: {
    playerAvatar: 'player-default',
  },
  attributes: {
    dataCard: 'data-card',
    dataValue: 'data-value',
    dataIndex: 'data-index',
  },
  cardElement: '<img src="images/cards/*.png" alt="*" class="card-image">',
  cardDefault: '<img src="images/cards/card-back.png" alt="card-back" class="card-image">',
  cardOptions: [
    'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'
  ],
  allCards: [
    '2-a', '2-b', '2-c', '2-d',
    '3-a', '3-b', '3-c', '3-d',
    '4-a', '4-b', '4-c', '4-d',
    '5-a', '5-b', '5-c', '5-d',
    '6-a', '6-b', '6-c', '6-d',
    '7-a', '7-b', '7-c', '7-d',
    '8-a', '8-b', '8-c', '8-d',
    '9-a', '9-b', '9-c', '9-d',
    '10-a', '10-b', '10-c', '10-d',
    'J-a', 'J-b', 'J-c', 'J-d',
    'Q-a', 'Q-b', 'Q-c', 'Q-d',
    'K-a', 'K-b', 'K-c', 'K-d',
    'A-a', 'A-b', 'A-c', 'A-d',
  ]
}

export const templates = {
  avatarChoice: Handlebars.compile(document.querySelector('#template-avatar-choice').innerHTML),
}