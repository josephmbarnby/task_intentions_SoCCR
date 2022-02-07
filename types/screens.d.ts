// Declare a 'Screens' namespace to define props for each
// screen used in the experiment.
declare namespace Screens {
  type Generic = {
    trial: number;
    display: Display;
  }

  // End screen
  type End = Generic;

  // Matched screen
  type Matched = Generic;

  // Matching screen
  type Matching = Generic & {
    fetchData: boolean;
  };

  // Trial screen
  type Trial = Generic & {
    isPractice: boolean;
    participantPoints: number;
    partnerPoints: number;
    options: Points;
    answer: Options;
    selectionHandler: (selection: Options, points: {options: Points}, answer: Options) => void;
  }

  // SelectAvatar screen
  type SelectAvatar = Generic & {
    selectionHandler: (selection: string) => void;
  }

  // Inference screen
  type Inference = Generic & {
    selectionHandler: (firstValue: number, secondValue: number) => void;
  }

  // Agency screen
  type Agency = Generic & {
    selectionHandler: (firstValue: number) => void;
  }

  // Classification screen
  type Classification = Generic & {
    selectionHandler: (classification: string) => void;
  }

  // Summary screen
  type Summary = Generic & {
    postPhase: Display,
    selectionHandler: () => void;
  }
}
