// Logging level
import { LogLevel } from "consola";

// Configuration and other required data
export const Configuration = {
  // General information
  name: "Intentions game",
  studyName: "intentions-game",
  locale: "en-AU",

  // Error screen configuration
  allowParticipantContact: false,
  contact: "henry.burgess@wustl.edu",

  // Manipulations that are configurable in Gorilla
  manipulations: {
    partner: "Competitive",
  },

  // Collection of any stimuli used in the trials
  stimuli: {},

  // Seed for RNG
  seed: 0.1234,

  // Initial experiment state
  state: {
    participantID: "1234",
    participantAvatar: 0,
    partnerAvatar: 0,
    refreshPartner: false,
    partnerChoices: {},
  },

  // API endpoints for computations
  endpoint:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/task/intentions"
      : "https://api.henryburgess.me/task/intentions",

  // Avatar configuration details, including colours and names
  avatars: {
    names: {
      participant: ["a", "b", "c", "d", "e", "f"],
      partner: ["a", "b", "c"],
    },
    colours: ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"],
    variant: "beam",
  },

  // Force fullscreen
  fullscreen: false,

  // Set the logging level
  logging:
    process.env.NODE_ENV === "development" ? LogLevel.Verbose : LogLevel.Error,
};
