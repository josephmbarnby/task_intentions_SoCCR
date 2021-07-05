import { Graphics } from "./graphics";

/**
 * Screen interface defining the methods and attributes of
 * stimuli screens.
 */
interface Screen {
  _target: HTMLElement;
  _graphics: Graphics;

  getGraphics(): Graphics;
  link(_handler: { (event: any): void; (arg0: any): void; }): void;
  display(data: any): void;
  finish(): void;
}

/**
 * ChoiceScreen class
 */
export class ChoiceScreen implements Screen {
  _target: HTMLElement;
  _graphics: Graphics;

  /**
   * Default constructor for the ChoiceScreen class.
   * @param {object} _target DOM element used by jsPsych.
   */
  constructor(_target: HTMLElement) {
    this._target = _target;
    this._graphics = new Graphics(this._target);
  }

  /**
   * Get the Graphics instance for this ChoiceScreen.
   * @return {Graphics}
   */
  getGraphics(): Graphics {
    return this._graphics;
  }

  /**
   * Assign handlers to all Button elements
   * @param {Function} _handler function called by any Button elements
   */
  link(_handler: { (event: any): void; (arg0: any): void; }) {
    const _buttons = this.getGraphics().getFiltered('button');
    for (let b = 0; b < _buttons.length; b++) {
      this.getGraphics().setButtonHandler(_buttons[b].id, (e) => {
        e.buttonId = _buttons[b].id;
        _handler(e);
      });
    }
  }

  /**
   * Invokes displaying of the choice screen.
   * @param {any} data information about choice options
   */
  display(data: any) {
    // Clean any existing HTML & event handlers in the target
    this.getGraphics().clearGraphics();

    // Construct the view of the options.
    this.getGraphics().addTable(3, 3, this._target, 'optionDisplayParent');

    // Get all cells
    const _elements = this.getGraphics().getFiltered('cell');

    // Construct layout
    _elements.forEach((cell) => {
      const _cell = document.getElementById(cell.id);

      // Construct the arrangement of elements
      if (cell.attr.column === 2) {
        // Fourth column
        if (cell.attr.row === 0) {
          this.getGraphics().addSpacer(
              '200px',
              _cell,
              'optionButtonBlankHeader',
          );
        } else if (cell.attr.row === 1) {
          this.getGraphics().addButton(
              'Option One',
              _cell,
              'optionOneButton',
              'jspsych',
          );
        } else if (cell.attr.row === 2) {
          this.getGraphics().addButton(
              'Option Two',
              _cell,
              'optionTwoButton',
              'jspsych',
          );
        }
      } else if (cell.attr.column === 1) {
        // Third column
        if (cell.attr.row === 0) {
          this.getGraphics().addLabel(
              'Points for your partner',
              _cell,
              'optionPartnerHeader',
              true,
          );
        } else if (cell.attr.row === 1) {
          this.getGraphics().addLabel(
              `${data['Option1_Partner']}`,
              _cell,
              'optionOneLabelPartner',
          );
        } else if (cell.attr.row === 2) {
          this.getGraphics().addLabel(
              `${data['Option2_Partner']}`,
              _cell,
              'optionTwoLabelPartner',
          );
        }
      } else if (cell.attr.column === 0) {
        // Second column
        if (cell.attr.row === 0) {
          this.getGraphics().addLabel(
              'Points for you',
              _cell,
              'optionYouHeader',
              true,
          );
        } else if (cell.attr.row === 1) {
          this.getGraphics().addLabel(
              `${data['Option1_PPT']}`,
              _cell,
              'optionOneLabelYou',
          );
        } else if (cell.attr.row === 2) {
          this.getGraphics().addLabel(
              `${data['Option2_PPT']}`,
              _cell,
              'optionTwoLabelYou',
          );
        }
      } else {
        console.warn(`Unknown layout data: ` +
            `'${cell.attr.col},${cell.attr.row}'`);
      }
    });
  }

  /**
   * Function called when display is finished.
   */
  finish() {
    this._graphics.clearGraphics();
  }
}

/**
 * MatchScreen class that displays the matching process
 * to participants.
 */
export class MatchScreen implements Screen {
  _target: HTMLElement;
  _graphics: Graphics;
  /**
   * Default constructor for the ChoiceScreen class.
   * @param {object} _target DOM element used by jsPsych.
   */
  constructor(_target: HTMLElement) {
    this._target = _target;
    this._graphics = new Graphics(this._target);
  }

  /**
   * Get the Graphics instance
   * @return {Graphics} the graphics component
   */
  getGraphics() {
    return this._graphics;
  }

  /**
   * Bind a handler function to buttons
   * @param {Function} _handler function to run on button press
   */
  link(_handler: { (event: any): void; (arg0: any): void; }): void {
    const _buttons = this.getGraphics().getFiltered('button');
    for (let b = 0; b < _buttons.length; b++) {
      this.getGraphics().setButtonHandler(_buttons[b].id, (e) => {
        e.buttonId = _buttons[b].id;
        _handler(e);
      });
    }
  }

  /**
   * Invokes displaying of the choice screen.
   * @param {any} data information about choice options
   */
  display(data: any) {
    // Clean any existing HTML & event handlers in the target
    this.getGraphics().clearGraphics();

    // Construct the view of the options.
    this.getGraphics().addTable(1, 3, this._target, 'optionDisplayParent');

    // Get all cells
    const _elements = this.getGraphics().getFiltered('cell');

    if (data.hasOwnProperty('stage') && data.stage === 'matched') {
      // Construct layout
      _elements.forEach((cell) => {
        const _cell = document.getElementById(cell.id);

        if (cell.attr.row === 0) {
          // Add a label
          this.getGraphics().addLabel(
              `Matched with partner!`,
              _cell,
              `match-label`,
              true
          );
        } else if (cell.attr.row === 1) {
          // Randomly select a name
          const _names = [
            'Henry',
            'Linda',
            'Lisa',
            'Joe',
            'Jeff',
            'Ryan',
          ];
          const _name = Math.floor(Math.random() * _names.length);

          // Add an avatar
          this.getGraphics().addImage(
              `https://source.boringavatars.com/beam/120/${_names[_name]}`,
              _cell,
              'avatar'
          );
        } else if (cell.attr.row === 2) {
          // Add the continue button
          this.getGraphics().addButton(
              'Continue',
              _cell,
              'match-continue-btn',
              'jspsych',
          );
        }
      });
    } else if (data.hasOwnProperty('stage') && data.stage === 'matching') {
      // Construct layout
      _elements.forEach((cell) => {
        const _cell = document.getElementById(cell.id);

        if (cell.attr.row === 0) {
          // Add a label
          this.getGraphics().addLabel(
              `Matching you with a partner...`,
              _cell,
              `match-label`,
              true
          );
        } else if (cell.attr.row === 1) {
          // Add a spinner
          this.getGraphics().addSpinner(_cell, `spinner`);
        }
      });
    }
  }

  /**
   * Function called when display is finished.
   */
  finish() {
    this.getGraphics().clearGraphics();
  }
}

/**
 * Class to handle data collection and storage outside
 * the individual trials
 */
export class TrialDataManager {
  private _dataObject: any
  private _options: any
  private _recordKeypresses: boolean
  private _recordMouse: boolean
  private _mouseData: any[]
  private _lastMouseTime = 0
  private _mouseDelta = 100
  private _keypressData: any[]

  /**
   * Default constructor
   * @param {any} _dataObject existing data structure
   * @param {any} _options set of custom parameters
   */
  constructor(_dataObject: any, _options: any) {
    this._dataObject = _dataObject;
    this._options = _options;

    // Data collections
    this._keypressData = [];
    this._mouseData = [];

    // Read in any options
    this._extractOptions();

    // Gather accessible system information
    this._extractSystemInformation();
  }

  /**
   * Extract the options from the options
   * parameters
   */
  _extractOptions(): void {
    // Record keypresses
    if (this._options.keypress !== undefined) {
      if (this._options.keypress === true || this._options.keypress === false) {
        this._recordKeypresses = this._options.keypress;
      } else {
        console.warn(`Invalid option '${this._options.keypress}'!`);
      }
    }

    // Record mouse position
    if (this._options.mouse !== undefined) {
      if (this._options.mouse === true || this._options.mouse === false) {
        this._recordMouse = this._options.mouse;
      } else {
        console.warn(`Invalid option '${this._options.mouse}'!`);
      }
    }

    // Mouse recording delta
    if (this._options.delta !== undefined) {
      if (!isNaN(parseInt(this._options.delta))) {
        this._mouseDelta = parseInt(this._options.delta);
      } else {
        console.warn(`Invalid delta '${this._options.delta}'!`);
      }
    }
  }

  /**
   * Extract system information of participants device
   * @return {any} collection of system information
   */
  _extractSystemInformation() {
    const _systemInformation = {
      viewWidth: window.innerWidth,
      viewHeight: window.innerHeight,
      language: navigator.language,
      automated: navigator.webdriver,
      agent: navigator.userAgent,
      vendor: navigator.vendor,
    };
    return _systemInformation;
  }

  /**
   * Start data collection
   */
  start() {
    if (this._recordKeypresses) {
      document.addEventListener('keypress', this._keypressEvent.bind(this));
    }

    if (this._recordMouse) {
      document.addEventListener('mousemove', this._mouseEvent.bind(this));
    }
  }

  /**
   * Get the value of a field stored in the trial data
   * @param {string} _id ID of the field
   * @return {any} field value
   */
  getField(_id: string) {
    if (this._dataObject[_id] !== undefined) {
      return this._dataObject[_id];
    }
    console.warn(`Attempting to get unknown field '${_id}'`);
    return null;
  }

  /**
   * Set the value of a field stored in the trial data
   * @param {string} _id ID of the field
   * @param {any} _value field value
   */
  setField(_id: string, _value: any) {
    this._dataObject[_id] = _value;
  }

  /**
   * Store information on a keypress event
   * @param {any} _event event object
   */
  _keypressEvent(_event: any) {
    this._keypressData.push(
        `${performance.now()}:${_event.code}`
    );
  }

  /**
   * Store information on a mouse movement event
   * @param {any} _event event object
   */
  _mouseEvent(_event: any) {
    const _time = performance.now();
    // Restrict the frequency of updates
    if (_time - this._lastMouseTime > this._mouseDelta) {
      this._mouseData.push(
          `${performance.now()}:(${_event.clientX},${_event.clientY})`
      );
      this._lastMouseTime = _time;
    }
  }

  /**
   * Clean up any listeners
   */
  _tidy() {
    // Remove keypress listener
    if (this._recordKeypresses) {
      document.removeEventListener('keypress', this._keypressEvent.bind(this));
    }

    // Remove mouse listener
    if (this._recordMouse) {
      document.removeEventListener('mousemove', this._mouseEvent.bind(this));
    }
  }

  /**
   * Extract and return the data gathered throughout the trial
   * @return {any} the trial data
   */
  export(): any {
    if (this._recordKeypresses) {
      this._dataObject.keypresses = this._keypressData.toString();
    }

    if (this._recordMouse) {
      this._dataObject.mousemovement = this._mouseData.toString();
    }

    // Clean up any event listeners
    this._tidy();

    return this._dataObject;
  }
}

export default {ChoiceScreen, Graphics, TrialDataManager};
