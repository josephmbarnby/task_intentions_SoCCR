// Classes
// eslint-disable-next-line no-unused-vars, require-jsdoc
class ChoiceScreen {
  /**
   * Default constructor for the ChoiceScreen class.
   * @param {Object} _target DOM element used by jsPsych.
   */
  constructor(_target) {
    this._target = _target;
    this._graphics = new Graphics(this._target);
  }

  /**
   * Get the Graphics instance for this ChoiceScreen.
   * @return {Graphics}
   */
  getGraphics() {
    return this._graphics;
  }

  /**
   * Assign handlers to all Button elements
   * @param {Function} _handler function called by any Button elements
   */
  link(_handler) {
    const _buttons = this.getGraphics().getFiltered('button');
    for (let b = 0; b < _buttons.length; b++) {
      this.getGraphics().setButtonHandler(_buttons[b].id, _handler);
      console.debug(`Linked Button with ID '${_buttons[b].id}'`);
    }
    console.debug(`Buttons linked`);
  }

  /**
   * Invokes displaying of the choice screen.
   */
  display() {
    // Construct the view of the options.
    this.getGraphics().addButton(
        'Option One',
        this._target,
        'optionOneButton',
    );
    this.getGraphics().addButton(
        'Option Two',
        this._target,
        'optionTwoButton',
    );
    this.getGraphics().addTable(4, 2, this._target, 'optionDisplayParent');
  }
}

// eslint-disable-next-line no-unused-vars, require-jsdoc
class Graphics {
  /**
   * Default constructor for Graphics class.
   * @param {Object} _target DOM element used by jsPsych
   */
  constructor(_target) {
    this._target = _target;
    this._elements = [];
  }

  /**
   * Get the target element for the Graphics class
   * @return {Object}
   */
  getTarget() {
    return this._target;
  }

  /**
   * Get the list of elements being managed by the Graphics class
   * @return {Array}
   */
  getElements() {
    return this._elements;
  }

  /**
   * Create a <button> input element
   * @param {String} _text presented on the Button
   * @param {Object} _parent parent DOM element of the Button
   * @param {String} _id identifying tag of the Button
   * @param {Function} _handler called on Button press
   */
  addButton(_text, _parent, _id = 'button1', _handler = function() {}) {
    // Append details of element.
    const _descriptor = {
      type: 'button',
      parent: _parent,
      id: _id,
    };

    // Create Button instance to be appended to DOM parent.
    const _button = document.createElement('button');
    _button.textContent = _text;
    _button.id = _id;
    _button.onclick = _handler;

    // Append Button to DOM parent.
    _parent.appendChild(_button);

    // Store description of Button element.
    this._elements.push(_descriptor);
    console.debug(_descriptor);
  }

  /**
   * Create a <span> element.
   * @param {String} _text presented on the Label
   * @param {Object} _parent DOM element of the parent
   * @param {String} _id identifying tag of the Label
   */
  addLabel(_text, _parent, _id = 'label1') {
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

    // Append Label to DOM parent.
    _parent.appendChild(_label);

    // Store description of Label element.
    this._elements.push(_descriptor);
    console.debug(_descriptor);
  }

  /**
   * Create a flex-based <div> table-like element with a number of columns
   * and rows.
   * @param {Number} _columns number of columns
   * @param {Number} _rows number of rows
   * @param {Object} _parent DOM element of parent
   * @param {String} _id identifying tag of the table
   */
  addTable(_columns, _rows, _parent, _id = 'table1') {
    // Append details of element.
    const _descriptor = {
      type: 'table',
      parent: _parent,
      id: _id,
    };

    const _width = 80;
    const _cellWidth = _width / _columns;
    const _parentDiv = document.createElement('div');
    _parentDiv.style.minWidth = `${_width}vw`;

    // Create Table instance to be appended to DOM parent.
    for (let y = 0; y < _rows; y++) {
      // Create a new row
      const _rowDiv = document.createElement('div');
      _rowDiv.style.display = 'table-row';

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
    console.debug(_descriptor);
  }

  /**
   * Create a flex <div> acting as a table cell
   * @param {Number} _column column (x) coordinate
   * @param {Number} _row row (y) coordinate
   * @param {Object} _parent DOM element of the parent
   * @param {Number} _maxWidth set the maximum width
   * @param {String} _id identifying tag of the cell
   */
  _createCell(_column, _row, _parent, _maxWidth, _id = 'cell1') {
    // Append details of element.
    const _descriptor = {
      type: 'cell',
      parent: _parent,
      id: _id,
    };

    const _cellDiv = document.createElement('div');
    _cellDiv.style.display = 'table-cell';
    _cellDiv.style.minWidth = _maxWidth;
    _cellDiv.innerHTML = `<p>Row: ${_row}, Col: ${_column}</p>`;

    // Append <div> to DOM parent.
    _parent.appendChild(_cellDiv);

    // Store description of cell element.
    this._elements.push(_descriptor);
    console.debug(_descriptor);
  }

  /**
   * Update the text displayed by a Label
   * @param {String} _id identifying tag of the Label
   * @param {String} _text updated text to display
   */
  updateLabel(_id, _text) {
    const _label = this._getElement(_id);
    if (_label !== null) {
      _label.textContent = _text;
    }
  }

  /**
   * Update the handler of a Button
   * @param {String} _id identifying tag of Button
   * @param {Function} _handler new handler function to assign
   */
  setButtonHandler(_id, _handler = function() {}) {
    const _button = this._getElement(_id);
    if (_button !== null) {
      _button.onclick = _handler;
    }
  }

  /**
   * Check if element exists
   * @param {String} _id identifying tag of element to find
   * @return {Object} DOM element if found, null if not found
   */
  _getElement(_id) {
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
  getFiltered(_type) {
    const _result = [];
    for (let e = 0; e < this._elements.length; e++) {
      const _el = this._elements[e];
      if (_el.type === _type) {
        _result.push(_el);
      }
    }
    return _result;
  }
}
