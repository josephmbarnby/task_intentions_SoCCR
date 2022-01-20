// Declare a 'Screens' namespace to define props for each
// screen used in the experiment.
declare namespace Screens {
  interface End {
    display: Display;
  }

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
    selectionHandler: (selection: string, answer: string) => void;
  }

  interface SelectAvatar {
    display: Display;
    selectionHandler: (selection: string) => void;
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
