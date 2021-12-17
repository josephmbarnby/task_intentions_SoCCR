// Configuration and other required data
export const Configuration = {
  // General information
  studyName: 'Intentions game',
  pluginName: 'intentions-game',
  locale: 'en-AU',

  // Error screen configuration
  allowParticipantContact: false,
  contact: 'henry.burgess@wustl.edu',

  // Manipulations that are configurable in Gorilla
  manipulations: {},

  // Collection of any stimuli used in the trials
  stimuli: {},

  // Seed for RNG
  seed: 'intentions',

  // Initial experiment state
  state: {
    participantAvatar: 0,
    partnerAvatar: 0,
    refreshPartner: false,
  },

  // Individual type
  individualType: 'Test',

  // List of avatar names (not displayed, only used to generate avatars)
  avatars: [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ],

  partners: [
    'm',
    'n',
    'o',
  ],

  fullscreen: false,
};
