// shapes/Square



// Yeah, a `Square` is a square.
var Square = exports.Square = extend(inherit(Polygon), {



	init: function (options) {
		options = options || {};

		Polygon.init.call(this, options);

		// The square's width and height. Pretty obvious.
		this.size = options.size !== null ? options.size : 2;

		// `Polygon` exposes `vertices`, an alias to `_vertices`, intended to be a straightforward way to manipulate the path. However, because `Square` changes this path *by itself* (according to its position and rotation), `vertices` is removed by `Square`, leaving only the `_vertices` intended for private use.
		delete this.vertices;

		return this;   // method chaining
	},


	// Recompose the `vertices` list.
	_update: function () {
		var thus = this;    // alias for shorter code

		thus._vertices = [
			exports.v(0, 0),
			exports.v(thus.size, 0),
			exports.v(thus.size, thus.size),
			exports.v(0, thus.size)
		];

		Node._update.call(this);    // Update the rest.
	}



});



// Export a shorthand.
var sq = exports.sq = function (options) {
	return inherit(Square)
	.init(options);
};