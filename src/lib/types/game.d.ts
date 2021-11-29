// TrialData type
export type TrialData = {
    optionOne: {
      participant: number,
      partner: number,
    },
    optionTwo: {
      participant: number,
      partner: number,
    }
};

// TrialProps type
export type TrialProps = {
  avatar: number,
  points: number,
  stage: string,
  data: TrialData,
  endTrial: (selection: string) => void,
};

