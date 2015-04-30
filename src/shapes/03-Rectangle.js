// shapes/Rectangle



// Yeah, a `Reactangle` is a rectangle.
var Rectangle = exports.Rectangle = extend(inherit(Polygon), {



	init: function (options) {
		options = options || {};

		Polygon.init.call(this, options);

		// The rectangle's width.
		this._w = options.width !== null ? options.width : 60;
		// The rectangle's height.
		this._h = options.height !== null ? options.height : 40;

		// `Polygon` exposes `vertices`, an alias to `_vertices`, intended to be a straightforward way to manipulate the path. However, because `Rectangle` changes this path *by itself* (according to its position and rotation), `vertices` is removed by `Rectangle`, leaving only the `_vertices` intended for private use.
		delete this.vertices;

		return this;   // method chaining
	},



	// Getter Setter: If a `width` is given, change it on this `Rectangle` and call `_u()` to recalculate the `vertices` array. Otherwise return the current `_w`.
	width: function (width) {
		if (width !== null) {
			this._w = width;
			this._u();
			return this;   // method chaining
		} else
			return this._w;   // method chaining
	},



	// Getter Setter: If a `height` is given, change it on this `Rectangle` and call `_u()` to recalculate the `vertices` array. Otherwise return the current `_h`.
	height: function (height) {
		if (height !== null) {
			this._h = height;
			this._u();
			return this;   // method chaining
		} else
			return this._h;   // method chaining
	},



	// Recalculate the `vertices` array.
	_u: function () {
		var thus = this;   // alias for shorter code

		thus._v = [
			v(0, 0),
			v(thus._w, 0),
			v(thus._w, thus._h),
			v(0, thus._h)
		];

		// call `_u()` on all child nodes
		array.foreach(this.children, '_u');
	}



});



// Export a shorthand.
var r = exports.r = function (options) {
	return inherit(Rectangle)
	.init(options);
};