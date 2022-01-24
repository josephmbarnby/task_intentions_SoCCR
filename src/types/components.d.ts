// Declare a 'Components' namespace to define props for each
// of the components used in the experiment.
declare namespace Components {
  interface Layout {
    display: Display;
    screen:
        Screens.Matched | Screens.Matching | Screens.Trial |
        Screens.SelectAvatar | Screens.Inference | Screens.Agency |
        Screens.Classification;
  }

  interface Option {
    optionKey: string;
    optionName: string;
    pointsParticipant: number;
    pointsPartner: number;
  }

  interface PlayerCard {
    gridArea: string;
    name: string;
    points: number;
    avatar: string;
  }

  interface RangeSlider {
    min: number;
    max: number;
    initial?: number;
    leftLabel: string;
    rightLabel: string;
    onChange?: () => any;
    setValue?: (value: number) => void;
  }

  interface SelectableAvatar {
    size: number;
    name: string;
    state: string;
    setState: (avatar: string) => void;
  }
}