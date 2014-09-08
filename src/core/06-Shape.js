// shapes/Shape
// `Shape` is a base class providing `fillColor`, `strokeColor` and `lineWidth`.



// Export the `Shape` "class" and a shorthand.
exports.Shape = Shape;
exports.sh = function (options) {
	return new Shape(options);
};



// Let `Shape` inherit from `Node`.
inherit(Shape, Node);



// Create a new `Shape` based on `options`.
function Shape (options) {
	Node.call(options);    // call the super class constructor

	// The color the shape will be filled with. Can be any valid CSS color.
	this.fillColor = options.fillColor || 'gray';
	// The color the shape will be bordered with. Can be any valid CSS color.
	this.strokeColor = options.strokeColor || 'black';
	// The width of the border.
	this.lineWidth = options.lineWidth !== null ? options.lineWidth : 1;
}



// Add methods to the prototype of `Shape`.


// Prepare drawing the shape by changing the colors of the rendering context.
Shape.prototype.draw = function () {
	var context = this._root.context;    // aliases for shorter code

	context.fillStyle = this.fillColor;
	context.strokeStyle = this.strokeColor;
	context.lineWidth = this.lineWidth;
};