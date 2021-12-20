// The collection of display types
declare type Display =
    'playerChoice' | 'playerChoice2' | 'mid' | 'mid2' |
    'playerGuess' | 'matching' | 'matched' | 'selection' |
    'inference' | 'agency' | 'classification' | 'summary';

// The three individual types
declare type Individual = 'Test' | 'Prosocial' | 'Individual' | 'Competitive';

// Trial data row types
declare type Row = {
  randomise_blocks: string;
  randomise_trials: number;
  display: Display;
  ANSWER: 'Option 1' | 'Option 2';
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

// Trial
declare type Trial = {
  display: Display;
  optionOneParticipant: number;
  optionOnePartner: number;
  optionTwoParticipant: number;
  optionTwoPartner: number;
  typeOne: string;
  typeTwo: string;
  avatar: 0;
  answer: string;
  clearScreen: boolean;
};
