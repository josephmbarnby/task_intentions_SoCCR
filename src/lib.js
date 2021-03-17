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
   * @return {Array<Object>}
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
    const _descriptor = {
      type: 'button',
      parent: _parent,
      id: _id,
    };
    this._elements.push(_descriptor);
    console.debug(_descriptor);
  }
}

module.exports = {
  ChoiceScreen,
  Graphics,
};
