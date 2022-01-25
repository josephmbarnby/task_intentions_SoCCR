// Declare a 'Components' namespace to define props for each
// of the components used in the experiment.
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
