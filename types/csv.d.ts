// Declare CSV module type
declare module '*.csv';

// CSV data row types
declare type Row = {
  randomise_blocks: string;
  randomise_trials: number;
  display: Display;
  ANSWER: Options;
  Option1_PPT: number;
  Option1_Partner: number;
  Option2_PPT: number;
  Option2_Partner: number;
  ShowProgressBar: number;
  Type1: Partner;
  Type2: Partner;
  Difference1: number;
  Difference2: number;
};
