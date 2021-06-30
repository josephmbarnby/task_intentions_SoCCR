import { Spinner } from 'spin.js'
import 'spin.js/spin.css'

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
      this.getGraphics().setButtonHandler(_buttons[b].id, e => {
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
    this.getGraphics().addTable(4, 3, this._target, 'optionDisplayParent');

    // Get all cells
    const _elements = this.getGraphics().getFiltered('cell');

    // Construct layout
    _elements.forEach((cell) => {
      const _cell = document.getElementById(cell.id);

      // Construct the arrangement of elements
      if (cell.attr.column === 3) {
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
          );
        } else if (cell.attr.row === 2) {
          this.getGraphics().addButton(
              'Option Two',
              _cell,
              'optionTwoButton',
          );
        }
      } else if (cell.attr.column === 2) {
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
      } else if (cell.attr.column === 1) {
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
      } else if (cell.attr.column === 0) {
        // First column
        if (cell.attr.row === 0) {
          this.getGraphics().addSpacer(
              '200px',
              _cell,
              'optionBlankHeader',
          );
        } else if (cell.attr.row === 1) {
          this.getGraphics().addSpacer(
              '200px',
              _cell,
              'optionOneLabelBlank',
          );
        } else if (cell.attr.row === 2) {
          this.getGraphics().addSpacer(
              '200px',
              _cell,
              'optionTwoLabelBlank',
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

  getGraphics() {
    return this._graphics;
  }

  link(_handler: { (event: any): void; (arg0: any): void; }) {

  }

  /**
   * Invokes displaying of the choice screen.
   * @param {any} data information about choice options
   */
  display(data: any) {
    // Clean any existing HTML & event handlers in the target
    this.getGraphics().clearGraphics();

    // Construct the view of the options.
    this.getGraphics().addTable(1, 2, this._target, 'optionDisplayParent');

    // Get all cells
    const _elements = this.getGraphics().getFiltered('cell');

    // Construct layout
    _elements.forEach((cell) => {
      const _cell = document.getElementById(cell.id);

      if (cell.attr.row === 0) {
        // Add a label
        this.getGraphics().addLabel(`Matching you with a partner...`, _cell, `match-label`, true)
      } else if (cell.attr.row === 1) {
        // Add a spinner
        this.getGraphics().addSpinner(_cell, `spinner`);
      }      
    });
  }

  /**
   * Function called when display is finished.
   */
  finish() {
    this.getGraphics().clearGraphics();
  }
}

export class Graphics {
  private _elements: any[];
  private _target: HTMLElement;

  /**
   * Default constructor for Graphics class.
   * @param {Object} _target DOM element used by jsPsych
   */
  constructor(_target: HTMLElement) {
    this._target = _target;
    this._elements = [];
  }

  /**
   * Get the target element for the Graphics class
   * @return {Object}
   */
  getTarget(): object {
    return this._target;
  }

  /**
   * Get the list of elements being managed by the Graphics class
   * @return {Array}
   */
  getElements(): Array<any> {
    return this._elements;
  }

  /**
   * Create a <button> input element
   * @param {String} _text presented on the Button
   * @param {Object} _parent parent DOM element of the Button
   * @param {String} _id identifying tag of the Button
   * @param {Function} _handler called on Button press
   */
  addButton(_text: string, _parent: HTMLElement, _id: string = 'button1', _handler = function() {}) {
    // Append details of element.
    const _descriptor = {
      type: 'button',
      parent: _parent,
      id: _id,
    };

    // Create Button instance to be appended to DOM parent.
    const _button = document.createElement('button');
    _button.className = 'intentions-table-button';
    _button.textContent = _text;
    _button.id = _id;
    _button.onclick = _handler;

    // Append Button to DOM parent.
    _parent.appendChild(_button);

    // Store description of Button element.
    this._elements.push(_descriptor);
  }

  /**
   * Create a <span> element.
   * @param {string} _text presented on the Label
   * @param {object} _parent DOM element of the parent
   * @param {string} _id identifying tag of the Label
   * @param {boolean} _bold style text or not
   */
  addLabel(_text: string, _parent: HTMLElement, _id: string = 'label1', _bold: boolean = false) {
    // Append details of element.
    const _descriptor = {
      type: 'label',
      parent: _parent,
      id: _id,
    };

    // Create Label instance to be appended to DOM parent.
    const _label = document.createElement('span');
    _label.textContent = _text;
    _label.id = _id;

    if (_bold === true) {
      _label.style.fontWeight = 'bold';
    }

    // Append Label to DOM parent.
    _parent.appendChild(_label);

    // Store description of Label element.
    this._elements.push(_descriptor);
  }

  /**
   * Create a <img> element.
   * @param {string} _src source URL of the Image
   * @param {object} _parent DOM element of the parent
   * @param {string} _id identifying tag of the Label
   * @param {boolean} _bold style text or not
   */
    addImage(_src: string, _parent: HTMLElement, _id: string = 'image1') {
    // Append details of element.
    const _descriptor = {
      type: 'image',
      parent: _parent,
      id: _id,
    };

    // Create Label instance to be appended to DOM parent.
    const _img = document.createElement('img');
    _img.src = _src;
    _img.id = _id;

    // Update the style of the parent
    _parent.style.height = 'auto';

    // Append Label to DOM parent.
    _parent.appendChild(_img);

    // Store description of Label element.
    this._elements.push(_descriptor);
  }

  /**
   * Create a <img> element.
   * @param {string} _src source URL of the Image
   * @param {object} _parent DOM element of the parent
   * @param {string} _id identifying tag of the Label
   * @param {boolean} _bold style text or not
   */
   addSpinner(_parent: HTMLElement, _id: string = 'spinner1') {
    // Append details of element.
    const _descriptor = {
      type: 'spinner',
      parent: _parent,
      id: _id,
    };

    // Append Spinner to DOM parent.
    const _spinner = new Spinner().spin();
    _parent.appendChild(_spinner.el)

    // Store description of Label element.
    this._elements.push(_descriptor)
  }

  /**
   * Create and place a spacer element
   * @param {string} _width the width of the cell
   * @param {object} _parent the parent of the spacer
   * @param {string} _id identifier
   */
  addSpacer(_width: string, _parent: HTMLElement, _id: string = 'space1') {
    // Append details of element.
    const _descriptor = {
      type: 'spacer',
      parent: _parent,
      id: _id,
    };

    // Create Spacer instance to be appended to DOM parent.
    const _spacer = document.createElement('div');
    _spacer.style.width = _width;
    _spacer.innerHTML = '&nbsp;';
    _spacer.id = _id;

    // Append Spacer to DOM parent.
    _parent.appendChild(_spacer);

    // Store description of Spacer element.
    this._elements.push(_descriptor);
  }

  /**
   * Create a flex-based <div> table-like element with a number of columns
   * and rows.
   * @param {Number} _columns number of columns
   * @param {Number} _rows number of rows
   * @param {Object} _parent DOM element of parent
   * @param {String} _id identifying tag of the table
   */
  addTable(_columns: number, _rows: number, _parent: HTMLElement, _id: string = 'table1') {
    // Append details of element.
    const _descriptor = {
      type: 'table',
      parent: _parent,
      id: _id,
    };

    const _width = 80;
    const _cellWidth = _width / _columns;
    const _parentDiv = document.createElement('div');
    _parentDiv.className = 'intentions-table';

    // Create Table instance to be appended to DOM parent.
    for (let y = 0; y < _rows; y++) {
      // Create a new row
      const _rowDiv = document.createElement('div');
      _rowDiv.className = 'intentions-table-row';

      // Add cells to the row
      for (let x = 0; x < _columns; x++) {
        this._createCell(x, y, _rowDiv, _cellWidth, `cell[${x},${y}]`);
      }

      // Append the row to the parent
      _parentDiv.appendChild(_rowDiv);
    }

    // Append <div> to DOM parent.
    _parent.appendChild(_parentDiv);

    // Store description of Table element.
    this._elements.push(_descriptor);
  }

  /**
   * Create a flex <div> acting as a table cell
   * @param {Number} _column column (x) coordinate
   * @param {Number} _row row (y) coordinate
   * @param {Object} _parent DOM element of the parent
   * @param {Number} _maxWidth set the maximum width
   * @param {String} _id identifying tag of the cell
   */
  _createCell(_column: number, _row: number, _parent: HTMLDivElement, _maxWidth: number, _id: string = 'cell1') {
    // Append details of element.
    const _descriptor = {
      type: 'cell',
      parent: _parent,
      id: _id,
      attr: {
        row: _row,
        column: _column,
      },
    };

    const _cellDiv = document.createElement('div');
    _cellDiv.id = `cell[${_column},${_row}]`;
    _cellDiv.className = 'intentions-table-cell';

    // Append <div> to DOM parent.
    _parent.appendChild(_cellDiv);

    // Store description of cell element.
    this._elements.push(_descriptor);
  }

  /**
   * Update the text displayed by a Label
   * @param {String} _id identifying tag of the Label
   * @param {String} _text updated text to display
   */
  updateLabel(_id: string, _text: string) {
    const _label: any = this._getElement(_id);
    if (_label !== null) {
      _label.textContent = _text;
    }
  }

  /**
   * Update the handler of a Button
   * @param {String} _id identifying tag of Button
   * @param {Function} _handler new handler function to assign
   */
  setButtonHandler(_id: string, _handler: Function) {
    const _button: any = this._getElement(_id);
    if (_button !== null) {
      _button.onclick = _handler;
    }
  }

  /**
   * Check if element exists
   * @param {String} _id identifying tag of element to find
   * @return {Object} DOM element if found, null if not found
   */
  _getElement(_id: string): HTMLElement {
    for (let e = 0; e < this._elements.length; e++) {
      const _el = this._elements[e];
      if (_el.id === _id) {
        return document.getElementById(_id);
      }
    }
    console.warn(`Element with ID '${_id}' not found`);
    return null;
  }

  /**
   * Retrieve all elements of a specific type
   * @param {String} _type class of element to retrieve
   * @return {Array} collection of elements with matching type
   */
  getFiltered(_type: string): Array<any> {
    const _result = [];
    for (let e = 0; e < this._elements.length; e++) {
      const _el = this._elements[e];
      if (_el.type === _type) {
        _result.push(_el);
      }
    }
    return _result;
  }

  /**
   * Clear the graphics view, essentially resets the Graphics instance.
   */
  clearGraphics() {
    // Clear the HTML
    this._target.innerHTML = '';

    // Remove event listeners
    this._elements.forEach(_el => {
      if (_el._type === 'button') {
        document.removeEventListener('click', this._getElement(_el._id).onclick);
      }
    });

    // Empty the list of elements
    this._elements = [];
  }
}

export class TrialDataManager {
  private _dataObject: any
  private _options: any
  private _recordKeypresses: boolean
  private _recordMouse: boolean
  private _mouseData: any[]
  private _lastMouseTime = 0
  private _mouseDelta = 100
  private _keypressData: any[]

  constructor(_dataObject: any, _options: any) {
    this._dataObject = _dataObject
    this._options = _options

    // Data collections
    this._keypressData = []
    this._mouseData = []

    // Read in any options
    this._extractOptions()

    // Gather accessible system information
    this._extractSystemInformation()
  }

  _extractOptions() {
    // Record keypresses
    if (this._options.keypress !== undefined) {
      if (this._options.keypress === true || this._options.keypress === false) {
        this._recordKeypresses = this._options.keypress
      } else {
        console.warn(`Invalid option '${this._options.keypress}'!`)
      }
    }

    // Record mouse position
    if (this._options.mouse !== undefined) {
      if (this._options.mouse === true || this._options.mouse === false) {
        this._recordMouse = this._options.mouse
      } else {
        console.warn(`Invalid option '${this._options.mouse}'!`)
      }
    }

    // Mouse recording delta
    if (this._options.delta !== undefined) {
      if (!isNaN(parseInt(this._options.delta))) {
        this._mouseDelta = parseInt(this._options.delta)
      } else {
        console.warn(`Invalid delta '${this._options.delta}'!`)
      }
    }
  }

  _extractSystemInformation() {
    const _systemInformation = {
      viewWidth: window.innerWidth,
      viewHeight: window.innerHeight,
      language: navigator.language,
      automated: navigator.webdriver,
      agent: navigator.userAgent,
      vendor: navigator.vendor,
    }
    return _systemInformation
  }

  start() {
    if (this._recordKeypresses) {
      document.addEventListener('keypress', this._keypressEvent.bind(this))
    }

    if (this._recordMouse) {
      document.addEventListener('mousemove', this._mouseEvent.bind(this))
    }
  }

  getField(_id: string) {
    if (this._dataObject[_id] !== undefined) {
      return this._dataObject[_id]
    }
    console.warn(`Attempting to get unknown field '${_id}'`)
    return null
  }

  setField(_id: string, _value: any) {
    this._dataObject[_id] = _value
  }

  _keypressEvent(_event: any) {
    this._keypressData.push(
      `${performance.now()}:${_event.code}`
    )
  }

  _mouseEvent(_event: any) {
    const _time = performance.now()
    // Restrict the frequency of updates
    if (_time - this._lastMouseTime > this._mouseDelta) {
      this._mouseData.push(
        `${performance.now()}:(${_event.clientX},${_event.clientY})`
      )
      this._lastMouseTime = _time
    }
  }

  /**
   * Clean up any listeners
   */
  _tidy() {
    // Remove keypress listener
    if (this._recordKeypresses) {
      document.removeEventListener('keypress', this._keypressEvent.bind(this))
    }

    // Remove mouse listener
    if (this._recordMouse) {
      document.removeEventListener('mousemove', this._mouseEvent.bind(this))
    }
  }

  /**
   * Extract and return the data gathered throughout the trial
   * @returns {any} the trial data
   */
  export(): any {
    if (this._recordKeypresses) {
      this._dataObject.keypresses = this._keypressData.toString()
    }

    if (this._recordMouse) {
      this._dataObject.mousemovement = this._mouseData.toString()
    }

    // Clean up any event listeners
    this._tidy()

    return this._dataObject
  }
}

export default {ChoiceScreen, Graphics, TrialDataManager};
