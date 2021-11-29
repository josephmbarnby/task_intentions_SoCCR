// Trial data row types
export type Row = {
  randomise_blocks: string,
  randomise_trials: number,
  display: DisplayType,
  ANSWER: 'Option 1' | 'Option 2',
  Option1_PPT: number,
  Option1_Partner: number,
  Option2_PPT: number,
  Option2_Partner: number,
  ShowProgressBar: number,
  Type1: IndividualType,
  Type2: IndividualType,
  Difference1: number,
  Difference2: number,
};

// The three display types (similar to 'stages')
export type DisplayType = 'playerChoice' | 'mid' | 'playerGuess' | 'mid2';

// The three individual types
export type IndividualType = 'Prosocial' | 'Individual' | 'Competitive';
