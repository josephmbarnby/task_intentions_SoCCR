// Switcher component
declare type Switcher = {
  display: Display;
  screen:
      Screens.Matched | Screens.Matching | Screens.Trial |
      Screens.SelectAvatar | Screens.Inference | Screens.Agency |
      Screens.Classification;
};

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
    isPractice: boolean;
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

  interface Summary {
    display: Display;
    postPhase: Display,
    selectionHandler: () => void;
  }
}
