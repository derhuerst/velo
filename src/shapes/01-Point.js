// shapes/Point



// Export the `Point` "class" and a shorthand.
exports.Point = Point;
exports.pt = function (options) {
	return new Point(options);
};



// Let `Point` inherit from `Shape`.
inherit(Point, Shape);



// todo
function Point (options) {
	options = options || {};

	Shape.call(options);    // call the super class constructor

	// The size of the rendered dot.
	this.size = options.size !== null ? options.size : 2;
}



// Add methods to the prototype of `Point`.


// Draw a little dot to the canvas.
Point.prototype.draw = function () {
	// aliases for shorter code
	var thus = this,
	context = thus._root.context,
	position = thus._absPosition,
	size = thus.size|0;

	// Prepare drawing.
	Shape.draw.call(thus);

	context.fillRect(position.x|0, position.y|0, size, size);
	if (thus.lineWidth > 0)
		context.strokeRect(position.x|0, position.y|0, size, size);
};