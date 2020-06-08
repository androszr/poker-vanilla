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
    currentBalance: '.balance-current span'
  },
  pointsGrid: {
    pointsGrid: '.points-grid',
    pair: '.jacks-better',
    twoPairs: '.two-pairs',
    threes: '.three-kind',
    fours: '.four-kind',
    fullHouse: '.full-house',
    straight: '.straight',
    flush: '.flush',
    straightFlush: '.straight-flush',
    royalFlush: '.royal-flush',
  },
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
    wonCombination: 'combination-won',
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
    'A-a', 'A-b', 'A-c', 'A-d', // 2
    'B-a', 'B-b', 'B-c', 'B-d', // 3
    'C-a', 'C-b', 'C-c', 'C-d', // 4
    'D-a', 'D-b', 'D-c', 'D-d', // 5
    'E-a', 'E-b', 'E-c', 'E-d', // 6
    'F-a', 'F-b', 'F-c', 'F-d', // 7
    'G-a', 'G-b', 'G-c', 'G-d', // 8
    'H-a', 'H-b', 'H-c', 'H-d', // 9
    'I-a', 'I-b', 'I-c', 'I-d', // 10
    'J-a', 'J-b', 'J-c', 'J-d', // J
    'K-a', 'K-b', 'K-c', 'K-d', // Q
    'L-a', 'L-b', 'L-c', 'L-d', // K
    'M-a', 'M-b', 'M-c', 'M-d', // A
  ],
  winCombinations: {
    typeCombinations: {
      pair: [/([J-M])\1/],
      twoPairs: [/^(?=.{5}$).*(?:([A-M])\1.*([A-M])\2|([A-M])\3.*([A-M])\4)/],
      threes: [/([A-M])\1\1/],
      fours: [/([A-M])\1\1\1/],
      fullHouse: [/^(?=.{5}$)*(?:([A-M])\1\1)(?:([A-M])\2)|(?:([A-M])\3)(?:([A-M])\4\4)/],
    },
    colorCombinations: {
      flush: /([a-e])\1\1\1\1/,
    },
  },
  pointsCombinations: {
    none: 0,
    pair: 5,
    twoPairs: 10,
    threes: 15,
    fours: 125,
    fullHouse: 45,
    straight: 20,
    flush: 30,
    straightFlush: 250,
  },
}

export const templates = {
  avatarChoice: Handlebars.compile(document.querySelector('#template-avatar-choice').innerHTML),
}