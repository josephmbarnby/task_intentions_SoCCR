import {DisplayType} from './data';

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
