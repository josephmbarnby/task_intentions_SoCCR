declare type SwitcherProps = {
  display: DisplayType;
  screenProps: MatchedProps | MatchingProps | TrialProps | SelectAvatarProps;
}

// Props for each screen type
declare type MatchedProps = {
  display: DisplayType;
}

declare type MatchingProps = {
  display: DisplayType;
}

declare type TrialProps = {
  display: DisplayType;
  participantPoints: number;
  partnerPoints: number;
  options: {
    one: {
      participant: number,
      partner: number,
    },
    two: {
      participant: number,
      partner: number,
    }
  };
  answer: string;
  endTrial: (selection: string) => void;
};

declare type SelectAvatarProps = {
  display: DisplayType;
  selectionHandler: (_selection: string) => void;
};

// Trial data row types
declare type Row = {
  randomise_blocks: string;
  randomise_trials: number;
  display: DisplayType;
  ANSWER: 'Option 1' | 'Option 2';
  Option1_PPT: number;
  Option1_Partner: number;
  Option2_PPT: number;
  Option2_Partner: number;
  ShowProgressBar: number;
  Type1: IndividualType;
  Type2: IndividualType;
  Difference1: number;
  Difference2: number;
};

// Trial
declare type Trial = {
  display: DisplayType;
  optionOneParticipant: number;
  optionOnePartner: number;
  optionTwoParticipant: number;
  optionTwoPartner: number;
  typeOne: string;
  typeTwo: string;
  avatar: 0;
  answer: string;
  isLast: boolean;
}

// The three display types (similar to 'stages')
declare type DisplayType =
    'playerChoice' | 'playerChoice2' | 'mid' | 'mid2' |
    'playerGuess' | 'matching' | 'matched' | 'selection';

// The three individual types
declare type IndividualType = 'Test' | 'Prosocial' | 'Individual' | 'Competitive';
