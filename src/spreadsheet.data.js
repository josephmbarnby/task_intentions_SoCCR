import desktopConfig from './desktop.config';

// Default data spreadsheet used in the intentions game
const spreadsheet = {
  // Define the headings of the columns here
  columns: [
    'Option1_PPT',
    'Option1_Partner',
    'Option2_PPT',
    'Option2_Partner',
  ],
  // Rows of data, this is the main data component
  rows: [
    {Option1_PPT: 8, Option1_Partner: 8, Option2_PPT: 4, Option2_Partner: 5},
    {Option1_PPT: 8, Option1_Partner: 2, Option2_PPT: 10, Option2_Partner: 5},
    {Option1_PPT: 8, Option1_Partner: 7, Option2_PPT: 10, Option2_Partner: 7},
    {Option1_PPT: 8, Option1_Partner: 4, Option2_PPT: 34, Option2_Partner: 1},
  ],
  // List of partners and their associated graphics
  partners: [
    {
      name: 'partnerOne',
      image: desktopConfig.config.images['partnerOne'],
      type: 'competitive',
    },
    {
      name: 'partnerTwo',
      image: desktopConfig.config.images['partnerTwo'],
      type: 'competitive',
    },
  ],
};

export default {spreadsheet};
