// core/Canvas



// Export the `Canvas` "class" and a shorthand.
exports.Canvas = Canvas;
exports.c = function (element) {
	return new Canvas(element);
};



// Let `Canvas` inherit from `Node`.
inherit(Canvas, Node);



// `Canvas` manages the canvas element and the RenderingContext2d. It is the root of the scene graph.
function Canvas (element) {
	Node.call();    // call the super class constructor

	// A user might want to access the `_root` property, no matter if (s)he is dealing with the root node (a `Canvas` object).
	this._root = this;

	// Store a reference to the canvas DOM node (`HTMLCanvasElement`).
	this.element = element;
	// Store the rendering context (`RenderingContext2d`).
	this.context = element.getContext('2d');
}



// Add methods to the prototype of `Canvas`.
extend(Canvas.prototype, {



	// Clear the canvas.
	clear: function () {
		this.context.clearRect(0, 0, this.width, this.height);
		// todo: Research the "canvas width height" trick. Maybe it is faster.
		// http://simonsarris.com/blog/346-how-you-clear-your-canvas-matters
	},


	// Clear the canvas draw to it.
	// Since the `Canvas` object itself doesn't have to be drawn, this method just draws all it's children.
	draw: function () {
		this.clear();
		this.children.call('draw');
	}



});