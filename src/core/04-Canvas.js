// core/Canvas



// `Canvas` manages the canvas element and the RenderingContext2d. It is the root of the scene graph.
var Canvas = exports.Canvas = extend(inherit(Node), {



	init: function (element) {
		Node.init.call(this);

		// A user might want to access the `_root` property, even if this is the root node.
		this._root = this;

		// The canvas DOM node (`HTMLCanvasElement`).
		if (!element)
			throw new Error('No HTMLCanvasElement given.');
		this.element = element;
		// The rendering context (`RenderingContext2d`).
		this.context = element.getContext('2d');

		return this;   // method chaining
	},



	// Clear the canvas.
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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