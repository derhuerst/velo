// Yeah, a `Reactangle` is a rectangle.
var Rectangle = exports.Rectangle = extend(inherit(Polygon), {



	init: function (options) {
		options = options || {};
		var thus = this;   // proxy

		Polygon.init.call(thus, options);

		// The rectangle's width.
		thus._w = options.width !== null ? options.width : 60;
		// The rectangle's height.
		thus._h = options.height !== null ? options.height : 40;

		// `Polygon` exposes `vertices`, an alias to `_v`, intended to be a straightforward way to manipulate the path. However, because `Rectangle` changes this path *by itself* (according to its position and rotation), `vertices` is removed by `Rectangle`, leaving only the `_v` intended for private use.
		delete thus.vertices;
		thus._v = [
			v(0, 0),
			v(thus._w, 0),
			v(thus._w, thus._h),
			v(0, thus._h)
		];

		return thus;   // method chaining
	},



	// Getter Setter: If a `width` is given, set `_w` and modify the `vertices` array accordingly. Otherwise return the current `_w`.
	width: function (width) {
		if (width !== null) {
			this._w = width;
			this._v[1].x = this._v[2].x = this._w;
			return this;   // method chaining
		} else
			return this._w;
	},



	// Getter Setter: If a `height` is given, set `_h` and modify the `vertices` array accordingly. Otherwise return the current `_h`.
	height: function (height) {
		if (height !== null) {
			this._h = height;
			this._v[2].y = this._v[3].y = this._h;
			return this;   // method chaining
		} else
			return this._h;
	}



});



// Export a shorthand.
var r = exports.r = function (options) {
	return inherit(Rectangle)
	.init(options);
};