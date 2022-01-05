// The collection of display types
declare type Display =
    'playerChoice' | 'playerChoicePractice' | 'playerChoice2' | 'mid' | 'mid2' |
    'playerGuess' | 'playerGuessPractice' | 'matching' | 'matched' | 'selection' |
    'inference' | 'agency' | 'classification' | 'summary';

// The three individual types
declare type Individual = 'Test' | 'Prosocial' | 'Individual' | 'Competitive';

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
  Type1: Individual;
  Type2: Individual;
  Difference1: number;
  Difference2: number;
};

// Trial type to enforce parameters
declare type Trial = {
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
  display: Display,
  playerPoints: number,
  partnerPoints: number,
  selectedOption: 1 | 2, // uses 1 and 2 rather than strings
  inferenceResponseOne: number, 
  inferenceResponseTwo: number,
  agencyResponse: number,
  classification: string,
  trialDuration: number,
  correctGuess: 0 | 1, // 0 incorrect, 1 correct
};
