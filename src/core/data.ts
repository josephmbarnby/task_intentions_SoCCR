/**
 * Class to handle data collection and storage outside
 * the individual trials
 */
export class DataCapture {
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

export default {DataCapture};
