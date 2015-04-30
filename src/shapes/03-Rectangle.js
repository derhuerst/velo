// shapes/Rectangle



// Yeah, a `Reactangle` is a rectangle.
var Rectangle = exports.Rectangle = extend(inherit(Polygon), {



	init: function (options) {
		options = options || {};

		Polygon.init.call(this, options);

		// The rectangle's width. Pretty obvious.
		this._width = options.width !== null ? options.width : 60;
		// The rectangle's height. Pretty obvious.
		this._height = options.height !== null ? options.height : 40;

		// `Polygon` exposes `vertices`, an alias to `_vertices`, intended to be a straightforward way to manipulate the path. However, because `Rectangle` changes this path *by itself* (according to its position and rotation), `vertices` is removed by `Rectangle`, leaving only the `_vertices` intended for private use.
		delete this.vertices;

		return this;   // method chaining
	},



	// Getter Setter: If a `width` is given, change it on this `Rectangle` and call `_update()` to recalculate the `vertices` array. Otherwise return the current `_width`.
	width: function (width) {
		if (width !== null) {
			this._width = width;
			this._update();
			return this;   // method chaining
		} else
			return this._width;   // method chaining
	},



	// Getter Setter: If a `height` is given, change it on this `Rectangle` and call `_update()` to recalculate the `vertices` array. Otherwise return the current `_height`.
	height: function (height) {
		if (height !== null) {
			this._height = height;
			this._update();
			return this;   // method chaining
		} else
			return this._height;   // method chaining
	},



	// Recalculate the `vertices` array.
	_update: function () {
		var thus = this;   // alias for shorter code

		thus._vertices = [
			new Vector(0, 0),
			new Vector(thus.width, 0),
			new Vector(thus.width, thus.height),
			new Vector(0, thus.height)
		];

		Node._update.call(thus);   // let `Node._update` call the children.
	}



});



// Export a shorthand.
var r = exports.r = function (options) {
	return inherit(Rectangle)
	.init(options);
};