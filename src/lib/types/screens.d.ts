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
