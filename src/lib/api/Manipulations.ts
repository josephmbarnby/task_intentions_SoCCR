/**
 * Class that links to the Gorilla Manipulations API. It allows safe references
 * to the API while developing the tasks locally.
 */
export class ManipulationAPI {
  // Target object containing the manipulations
  private target: any;
  // List of manipulation keys
  private manipulations: string[];

  /**
   * Default constructor
   * @param {any} target target object containing the manipulations
   * @param {string[]} manipulations list of manipulation keys
   */
  constructor(target: any, manipulations: string[]) {
    this.manipulations = manipulations;
    this.target = target;
    this.connect();
  }

  /**
   * Retrieves the Gorilla instance and connects any manipulations specified
   * to the Gorilla Manipulations API.
   */
  private connect() {
    const _gorilla: any = window['gorilla'];
    this.manipulations.forEach((_manipulationKey) => {
      this.target[_manipulationKey] = _gorilla.manipulation(_manipulationKey);
    });
  }
}
