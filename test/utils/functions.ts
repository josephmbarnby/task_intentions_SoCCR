// Handler class
import Handler from "src/lib/classes/Handler";

/**
 * Generate a Trial configuration for test use
 * @param {Display} display the display type being tested
 * @return {any}
 */
export const getTrialConfiguration = (display: Display): Trial => {
  return {
    trial: 1,
    display: display,
    optionOneParticipant: 0,
    optionOnePartner: 0,
    optionTwoParticipant: 0,
    optionTwoPartner: 0,
    typeOne: "",
    typeTwo: "",
    avatar: 0,
    answer: "Option 1",
    isPractice: false,
    fetchData: false,
    clearScreen: false,
  };
};

/**
 * Generate a Handler instance for test use
 * @param {Display} display the display type being tested
 * @return {any}
 */
export const getHandler = (display: Display): Handler => {
  return new Handler(
    {
      trial: 1,
      display: display,
      playerPoints_option1: 0,
      partnerPoints_option1: 0,
      playerPoints_option2: 0,
      partnerPoints_option2: 0,
      playerPoints_selected: 0,
      partnerPoints_selected: 0,
      selectedOption_player: 1,
      realAnswer: "Option 1",
      inferenceResponse_Selfish: 0,
      inferenceResponse_Harm: 0,
      agencyResponse: 0,
      classification: "",
      trialDuration: 100,
      correctGuess: -1,
    },
    () => {
      return;
    }
  );
};
