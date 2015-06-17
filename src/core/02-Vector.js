// `Vector` represents a 2D vector. It can be used as a position or translation.
var Vector = exports.Vector = {



	// Initialize the vector. `x` and `y` are `0` by default.
	init: function (x, y) {
		this.x = x || 0;
		this.y = y || 0;

		return this;   // method chaining
	},



	// Set `x` and `y` to `0`.
	reset: function () {
		this.x = this.y = 0;

		return this;   // method chaining
	},



	// Add to the vector. Either one `Vector` object or two raw values `x` and `y` can be passed.
	add: function (x, y) {
		if (arguments.length >= 2) {   // assuming two raw values
			this.x += x;
			this.y += y;
		} else if (arguments.length === 1 && arguments[0]) {   // assuming one `Vector` object
			this.x += x.x;
			this.y += x.y;
		}

		return this;   // method chaining
	},



	// Apply a rotation of `angle` around `(0|0)` to the `x` and `y` values.
	rotate: function (angle) {
		if (angle !== 0){
			// proxies
			var x = this.x;
			var y = this.y;

			this.x = x * Math.cos(angle) - y * Math.sin(angle);
			this.y = x * Math.sin(angle) + y * Math.cos(angle);
		}

		return this;   // method chaining
	},



	// Check if this vector equals the given `Vector` object or raw values.
	equals: function (x, y) {
		if (y !== null)   // assuming two raw values
			return this.x === x.x && this.y === x.y;
		else   // assuming one `Vector` object
			return this.x === x && this.y === y;
	},



	// Return a new `Vector` object with the same values. The resulting vector is then `equal()` to this one.
	clone: function () {
		return v(this.x, this.y);
	}



};



// Export a shorthand.
var v = exports.v = function (x, y) {
	return inherit(Vector)
	.init(x, y);
};
