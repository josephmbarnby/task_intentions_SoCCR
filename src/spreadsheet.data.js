// Default data spreadsheet used in the intentions game
const spreadsheet = {
  rows: [
    {Option1_PPT: 8, Option1_Partner: 8, Option2_PPT: 4, Option2_Partner: 5},
    {Option1_PPT: 8, Option1_Partner: 2, Option2_PPT: 10, Option2_Partner: 5},
    {Option1_PPT: 8, Option1_Partner: 7, Option2_PPT: 10, Option2_Partner: 7},
    {Option1_PPT: 8, Option1_Partner: 4, Option2_PPT: 34, Option2_Partner: 1},
  ],
  columns: [
    'Option1_PPT',
    'Option1_Partner',
    'Option2_PPT',
    'Option2_Partner',
    // To-Do: Add these!
    'participant choice',
    'partner choice',
    'correct',
  ],
};

export default {spreadsheet};
