/**
 * @file jsPsych-related declarations.
 * @author Henry Burgess <henry.burgess@wustl.edu>
 */

// Declare jsPsych
declare const jsPsych;

// Timeline collection type
declare type Timeline = TimelineNode[];

// Timeline node type, representing different timeline
// element parameter types
declare type TimelineNode = {
  type?: string;

  // Fullscreen plugin
  message?: string;
  fullscreen_mode?: boolean;

  // Instructions plugin
  pages?: string[] | string[];
  allow_keys?: boolean;
  show_page_number?: boolean;
  show_clickable_nav?: boolean;

  // Trial plugin
  trial?: number;
  display?: Display | string;
  clearScreen?: boolean;
  optionOneParticipant?: number;
  optionOnePartner?: number;
  optionTwoParticipant?: number;
  optionTwoPartner?: number;
  typeOne?: string;
  typeTwo?: string;
  answer?: string;
  isPractice?: boolean;

  // Matching screen
  fetchData?: boolean;

  // Attention-check plugin
  prompt?: string;
  options?: string[];
  options_radio?: boolean;
  option_correct?: number;
  confirmation?: boolean;
  feedback_correct?: string;
  feedback_incorrect?: string;

  // Loop nodes
  timeline?: any[];
  conditional_function?: () => boolean;
};
