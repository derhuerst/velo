// Yeah, a `Square` is a square.
var Square = exports.Square = extend(inherit(Polygon), {



	init: function (options) {
		options = options || {};
		var thus = this;   // proxy

		Polygon.init.call(thus, options);

		// The square's width and height. Default is `2`.
		thus._s = options.size !== null ? options.size : 2;

		// `Polygon` exposes `vertices`, an alias to `_v`, intended to be a straightforward way to manipulate the path. However, because `Square` changes this path *by itself* (according to its position and rotation), `vertices` is removed by `Square`, leaving only the `_v` intended for private use.
		delete thus.vertices;
		thus._v = [
			v(0, 0),
			v(thus._s, 0),
			v(thus._s, thus._s),
			v(0, thus._s)
		];

		return thus;   // method chaining
	},



	// Getter Setter: If a `size` is given, set `_s` and modify the `vertices` array accordingly. Otherwise return the current `_s`.
	size: function (size) {
		if (size !== null) {
			this._w = size;
			this._v[1].x = this._v[2].x = this._v[2].y = this._v[3].y = this._s;
			return this;   // method chaining
		} else
			return this._w;
	}



});



// Export a shorthand.
var sq = exports.sq = function (options) {
	return inherit(Square)
	.init(options);
};