// convenience/Square



// Export the `Square` "class" and a shorthand.
exports.Square = Square;
exports.s = function (options) {
	return new Square(options);
};



// Let `Square` inherit from `Polygon`.
inherit(Square, Polygon);



// Yeah, a `Reactangle` is a rectangle.
function Square (options) {
	Polygon.call(options);    // call the super class constructor

	// The square's width and height. Pretty obvious.
	this.size = options.size !== null ? options.size : 2;

	// Remove the alias to `_vertices` set by `Polygon`.
	delete this.vertices;
}



// Add methods to the prototype of `Square`.


// Recompose the `vertices` list.
Square.prototype._update = function () {
	var thus = this;    // alias for shorter code

	thus._vertices = [
		exports.v(0, 0),
		exports.v(thus.size, 0),
		exports.v(thus.size, thus.size),
		exports.v(0, thus.size)
	];

	Node._update.call(this);    // Update the rest.
};