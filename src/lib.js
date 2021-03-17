// Classes
/**
 * Choice Screen graphics constructor
 */
class ChoiceScreen {
  /**
   * Default constructor for the ChoiceScreen class.
   * @param {Object} _target DOM element used by jsPsych.
   */
  constructor(_target) {
    this._target = _target;
    this._graphics = new Graphics(this._target);
  }
}

/**
 * Graphics class handling displaying and interacting with the DOM.
 */
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
    return;
  }
}
