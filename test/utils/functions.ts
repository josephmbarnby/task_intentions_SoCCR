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
      playerPoints_option1: NaN,
      partnerPoints_option1: NaN,
      playerPoints_option2: NaN,
      partnerPoints_option2: NaN,
      playerPoints_selected: NaN,
      partnerPoints_selected: NaN,
      selectedOption_player: NaN,
      realAnswer: "Option 1",
      inferenceResponse_Selfish: NaN,
      inferenceResponse_Harm: NaN,
      agencyResponse: NaN,
      classification: "",
      trialDuration: 100,
      correctGuess: NaN,
      server_alpha_par: NaN,
      server_beta_par: NaN,
      server_alpha_ppt: NaN,
      server_beta_ppt: NaN,
    },
    () => {
      return;
    }
  );
};
