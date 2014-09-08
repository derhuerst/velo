// shapes/Rectangle



// Export the `Rectangle` "class" and a shorthand.
exports.Rectangle = Rectangle;
exports.p = function (options) {
	return new Rectangle(options);
};



// Let `Rectangle` inherit from `Polygon`.
inherit(Rectangle, Polygon);



// Yeah, a `Reactangle` is a rectangle.
function Rectangle (options) {
	Polygon.call(options);    // call the super class constructor

	// The rectangle's width. Pretty obvious.
	this.width = options.width !== null ? options.width : 60;
	// The rectangle's height. Pretty obvious.
	this.height = options.height !== null ? options.height : 40;

	// Remove the alias to `_vertices` set by `Polygon`.
	delete this.vertices;
}



// Add methods to the prototype of `Rectangle`.


// Recompose the `vertices` list.
Rectangle.prototype._update = function () {
	var thus = this;    // alias for shorter code

	thus._vertices = [
		exports.v(0, 0),
		exports.v(thus.width, 0),
		exports.v(thus.width, thus.height),
		exports.v(0, thus.height)
	];

	Node._update.call(this);    // Update the rest.
};