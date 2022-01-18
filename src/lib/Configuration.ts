// Logging level
import {LogLevel} from 'consola';

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
  individual: 'Competitive',

  // Avatar configuration details, including colours and names
  avatars: {
    names: {
      participant: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
      ],
      partner: [
        'm',
        'n',
        'o',
      ],
    },
    colours: [
      '#92A1C6',
      '#146A7C',
      '#F0AB3D',
      '#C271B4',
      '#C20D90',
    ],
    variant: 'beam',
  },

  // Force fullscreen
  fullscreen: false,

  // Set the logging level
  logging: LogLevel.Verbose,
};
