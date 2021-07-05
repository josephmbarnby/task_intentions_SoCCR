import ReactDOM from 'react-dom'
import { Spinner } from 'spin.js';
import { Greeting } from './components';

/**
 * Graphics class to handle setup and display of stimuli
 */
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

  renderComponent() {
    ReactDOM.render(
      Greeting({
        name: 'Henry'
      }),
      this._target
    )
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
   * @param {String} _style styling to use on the Button
   * @param {Function} _handler called on Button press
   */
  addButton(
      _text: string,
      _parent: HTMLElement,
      _id: string = 'button1',
      _style = 'default',
      _handler = function() {}): void {
    // Append details of element.
    const _descriptor = {
      type: 'button',
      parent: _parent,
      id: _id,
    };

    // Create Button instance to be appended to DOM parent.
    const _button = document.createElement('button');
    if (_style === 'jspsych') {
      _button.className = 'jspsych-btn';
    } else {
      _button.className = 'intentions-table-button';
    }
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
  addLabel(
      _text: string,
      _parent: HTMLElement,
      _id: string = 'label1',
      _bold: boolean = false) {
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
    const _spinner = new Spinner({
      position: 'relative',
    }).spin();
    _parent.appendChild(_spinner.el);

    // Store description of Label element.
    this._elements.push(_descriptor);
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
  addTable(
      _columns: number,
      _rows: number,
      _parent: HTMLElement,
      _id: string = 'table1') {
    // Append details of element.
    const _descriptor = {
      type: 'table',
      parent: _parent,
      id: _id,
    };

    const _width = 80;
    const _height = 80;
    const _cellWidth = _width / _columns;
    const _cellHeight = _height / _rows;
    const _parentDiv = document.createElement('div');
    _parentDiv.className = 'intentions-table';

    // Create Table instance to be appended to DOM parent.
    for (let y = 0; y < _rows; y++) {
      // Create a new row
      const _rowDiv = document.createElement('div');
      _rowDiv.className = 'intentions-table-row';

      // Add cells to the row
      for (let x = 0; x < _columns; x++) {
        this._createCell(
            x,
            y,
            _rowDiv,
            _cellWidth,
            _cellHeight,
            `cell[${x},${y}]`
        );
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
   * @param {Number} _maxHeight set the maximum height
   * @param {String} _id identifying tag of the cell
   */
  _createCell(
      _column: number,
      _row: number,
      _parent: HTMLDivElement,
      _maxWidth: number,
      _maxHeight: number,
      _id: string = 'cell1') {
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
    _cellDiv.style.width = `${_maxWidth.toFixed(0)}%`;
    _cellDiv.style.minHeight = `${_maxHeight.toFixed(0)}%`;

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
    this._elements.forEach((_el) => {
      if (_el._type === 'button') {
        document.removeEventListener(
            'click',
            this._getElement(_el._id).onclick
        );
      }
    });

    // Empty the list of elements
    this._elements = [];
  }
}