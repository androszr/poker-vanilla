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
    submitButton: '.start-game-form [type="submit"]',
    avatarChoice: '.avatar-choice',
    avatarAvatar: '.avatar-details',
    allAvatars: '.avatar',
    activeAvatar: '.avatar-active',
    currentBalance: '.balance-current p',
  },
  gameScreen: {
    gameSection: '#game',
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
  }
}

export const templates = {
  avatarChoice: Handlebars.compile(document.querySelector('#template-avatar-choice').innerHTML),
}