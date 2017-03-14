var extend = require('./01-helpers').extend
var inherit = require('./01-helpers').inherit
var Node = require('./03-Node').Node

// `Canvas` manages the canvas element and the RenderingContext2d. It is the root of the scene graph.
var Canvas = exports.Canvas = extend(inherit(Node), {


	// Create a new `Vancas` using `element`. `element` must be a DOM node (`HTMLCanvasElement`).
	init: function (element) {
		Node.init.call(this);

		// A user might want to use the `_rn` property, even if a `Canvas` is the root node of the scene graph. See `Node._rn`.
		this._rn = this;

		// The DOM node (`HTMLCanvasElement`).
		if (!element)
			throw new Error('No HTMLCanvasElement given.');
		this.element = element;
		// The rendering context (`CanvasRenderingContext2d`).
		this.context = element.getContext('2d');

		return this;   // method chaining
	},



	// Clear the canvas.
	clear: function () {
		this.context.clearRect(0, 0, this.element.width, this.element.height);
	},



	// Draw all children draw to the canvas. Remember to call `clear` before.
	draw: function () {
		array.foreach(this.children, 'draw');
	}



});



// Export a shorthand.
var c = exports.c = function (element) {
	return inherit(Canvas)
	.init(element);
};
