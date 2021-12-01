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
  manipulations: {
    phaseOneTrials: 36,
    phaseTwoTrials: 72,
    phaseThreeTrials: 36,
    individualType: 'Test',
  },

  // Collection of any stimuli used in the trials
  stimuli: {},

  // Seed for RNG
  seed: 'intentions',

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
    'g',
    'h',
  ],

  fullscreen: false,
};
