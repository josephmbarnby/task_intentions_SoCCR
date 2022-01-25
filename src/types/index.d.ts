// The collection of display types
declare type Display =
    'playerChoice' | 'playerChoicePractice' | 'playerChoice2' | 'mid' | 'mid2' |
    'playerGuess' | 'playerGuessPractice' | 'matching' | 'matched' | 'selection' |
    'inference' | 'agency' | 'classification' | 'summary' | 'end';

// The three partner types
declare type Partner = 'Test' | 'Prosocial' | 'Individualist' | 'Competitive';

// Avatar styles
declare type AvatarStyles = 'beam' | 'marble' | 'pixel' | 'sunset' | 'ring' | 'bauhaus';

// Selection options
declare type Options = 'Option 1' | 'Option 2';

// CSV data row types
declare type Row = {
  randomise_blocks: string;
  randomise_trials: number;
  display: Display;
  ANSWER: Options;
  Option1_PPT: number;
  Option1_Partner: number;
  Option2_PPT: number;
  Option2_Partner: number;
  ShowProgressBar: number;
  Type1: Partner;
  Type2: Partner;
  Difference1: number;
  Difference2: number;
};

// Trial type to enforce parameters
declare type Trial = {
  trial: number,
  display: Display;
  optionOneParticipant: number;
  optionOnePartner: number;
  optionTwoParticipant: number;
  optionTwoPartner: number;
  typeOne: string;
  typeTwo: string;
  avatar: 0;
  answer: Options;
  isPractice: boolean;
  clearScreen: boolean;
};

// Data type used to enforce trial data storage format
declare type Data = {
  trial: number,
  display: Display,
  playerPoints_option1: number;
  partnerPoints_option1: number;
  playerPoints_option2: number;
  partnerPoints_option2: number;
  playerPoints_selected: number;
  partnerPoints_selected: number;
  selectedOption_player: -1 | 1 | 2, // uses 1 and 2 rather than strings
  realAnswer: Options;
  inferenceResponse_Selfish: number, 
  inferenceResponse_Harm: number,
  agencyResponse: number,
  classification: string,
  trialDuration: number,
  correctGuess: -1 | 0 | 1, // 0 incorrect, 1 correct
};
