// Declare a 'Components' namespace to define props for each
// of the components used in the experiment.
declare namespace Props {
  // Props for 'Components'
  declare namespace Components {
    // Layout component
    type Layout =  {
      display: Display;
      screen:
          Screens.Matched | Screens.Matching | Screens.Trial |
          Screens.SelectAvatar | Screens.Inference | Screens.Agency |
          Screens.Classification;
    }

    // Option component
    type Option = {
      optionKey: string;
      optionName: string;
      pointsParticipant: number;
      pointsPartner: number;
    }

    // PlayerCard component
    type PlayerCard = {
      gridArea: string;
      name: string;
      points: number;
      avatar: string;
    }

    // RangeSlider component
    type RangeSlider = {
      min: number;
      max: number;
      initial?: number;
      leftLabel: string;
      rightLabel: string;
      onChange?: () => any;
      setValue?: (value: number) => void;
    }

    // SelectableAvatar component
    type SelectableAvatar = {
      size: number;
      name: string;
      state: string;
      setState: (avatar: string) => void;
    }
  }

  // Props for 'Screens'
  declare namespace Screens {
    type GenericScreenProps = {
      trial: number;
      display: Display;
    }
  
    // End screen
    type End = GenericScreenProps;
  
    // Matched screen
    type Matched = GenericScreenProps;
  
    // Matching screen
    type Matching = GenericScreenProps & {
      fetchData: boolean;
    };
  
    // Trial screen
    type Trial = GenericScreenProps & {
      isPractice: boolean;
      participantPoints: number;
      partnerPoints: number;
      options: Points;
      answer: Options;
      handler: (selection: Options, points: {options: Points}, answer: Options) => void;
    }
  
    // SelectAvatar screen
    type SelectAvatar = GenericScreenProps & {
      handler: (selection: string) => void;
    }
  
    // Inference screen
    type Inference = GenericScreenProps & {
      handler: (firstValue: number, secondValue: number) => void;
    }
  
    // Agency screen
    type Agency = GenericScreenProps & {
      handler: (firstValue: number) => void;
    }
  
    // Classification screen
    type Classification = GenericScreenProps & {
      handler: (classification: string) => void;
    }
  
    // Summary screen
    type Summary = GenericScreenProps & {
      postPhase: Display,
      handler: () => void;
    }
  }
}

// Type for the 'PropFactory' return
declare type GeneratedPropValues = {
  props: any,
  callback: (...args) => void;
  duration: number;
}
