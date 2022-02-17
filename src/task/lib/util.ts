/**
 * Calculate the points gained from a phase
 * @param {Display} display phase to calculate points from
 * @param {string} column named column containing points
 * @return {number}
 */
export function calculatePoints(display: Display, column: string): number {
  let points = 0;

  if (display === 'playerGuess') {
    // `playerGuess` phased calculated differently
    const dataCollection = jsPsych.data.get()
        .filter({
          display: display,
        })
        .values();

    // Iterate through the data collection
    for (const row of dataCollection) {
      const realAnswer = row.realAnswer;
      // Determine if for the player or the partner
      if (column.startsWith('player')) {
        // Points for the player, sum partner points
        if (realAnswer === 'Option 1') {
          // Option 1
          points += row.partnerPoints_option1;
        } else {
          // Option 2
          points += row.partnerPoints_option2;
        }
      } else {
        // Points for the partner, sum player points
        if (realAnswer === 'Option 1') {
          // Option 1
          points += row.playerPoints_option1;
        } else {
          // Option 2
          points += row.playerPoints_option2;
        }
      }
    }
  } else {
    points = jsPsych.data.get()
        .filter({
          display: display,
        })
        .select(column)
        .sum();
  }
  return points;
}
