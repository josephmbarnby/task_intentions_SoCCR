// The collection of display types
declare type Display =
    'playerChoice' | 'playerChoice2' | 'mid' | 'mid2' |
    'playerGuess' | 'matching' | 'matched' | 'selection' |
    'inference' | 'agency' | 'classification';

// The three individual types
declare type Individual = 'Test' | 'Prosocial' | 'Individual' | 'Competitive';

// Switcher component
declare type Switcher = {
  display: Display;
  screen:
      Screens.Matched | Screens.Matching | Screens.Trial |
      Screens.SelectAvatar | Screens.Inference | Screens.Agency |
      Screens.Classification;
}

// Screens and the props required
declare namespace Screens {
  interface Matched {
    display: Display;
  }

  interface Matching {
    display: Display;
  }

  interface Trial {
    display: Display;
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
    selectionHandler: (selection: string) => void;
  }

  interface SelectAvatar {
    display: Display;
    selectionHandler: (_selection: string) => void;
  }

  interface Inference {
    display: Display;
    selectionHandler: (firstValue: number, secondValue: number) => void;
  }

  interface Agency {
    display: Display;
    selectionHandler: (firstValue: number) => void;
  }

  interface Classification {
    display: Display;
    selectionHandler: (classification: string) => void;
  }
}

declare namespace Components {
  interface RangeSlider {
    min: number;
    max: number;
    initial?: number;
    leftLabel: string;
    rightLabel: string;
    onChange?: () => any;
    setValue?: (value: number) => void;
  }

  interface IconAvatar {
    name: string;
    state: string;
    background: string;
    setState: (name: string) => void;
  }

  interface Option {
    optionKey: string;
    optionName: string;
    pointsParticipant: number;
    pointsParter: number;
  }

  interface PlayerAvatar {
    gridArea: string;
    name: string;
    points: number;
    avatar: string;
  }

  interface PlayerDetails {
    size: number;
    name: string;
    state: string;
    setState: (avatar: string) => void;
  }
}

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
}
