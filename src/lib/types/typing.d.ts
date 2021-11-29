export type SwitcherProps = {
  display: DisplayType;
  screenProps: TrialScreenProps |
      SelectionScreenProps |
      Record<string, unknown>
}

export type SelectionScreenProps = {
  selectionHandler: () => void;
};

export type TrialScreenProps = {
  avatar: number,
  points: number,
  data: any,
  stage: string,
  endTrial: () => void,
};

// TrialData type
export type TrialData = {
  optionOne: {
    participant: number,
    partner: number,
  },
  optionTwo: {
    participant: number,
    partner: number,
  }
};

// TrialProps type
export type TrialProps = {
  avatar: number,
  points: number,
  display: DisplayType,
  data: TrialData,
  endTrial: (selection: string) => void,
};

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
export type DisplayType =
    'playerChoice' | 'playerChoice2' | 'mid' | 'mid2' |
    'playerGuess' | 'matching' | 'matched' | 'selection';

// The three individual types
export type IndividualType = 'Prosocial' | 'Individual' | 'Competitive';
