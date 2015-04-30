// core/Vector



// `Vector` represents a 2D vector. It can be used as a position or translation.
var Vector = exports.Vector = {



	init: function (x, y){
		this.x = x || 0;
		this.y = y || 0;

		return this;   // method chaining
	},



	// Change the `x` and `y` values relatively. Either one `Vector` object or two raw values can be passed.
	add: function (x, y) {
		if (y !== null) {   // assuming two raw values
			this.x += x;
			this.y += y;
		} else if (x !== null) {   // assuming one `Vector` object
			this.x += x.x;
			this.y += y.y;
		}

		return this;   // method chaining
	},



	// Apply a rotation of `angle` around `(0|0)` to the `x` and `y` values.
	rotate: function (angle) {
		this.x = Math.cos(angle) * x;
		this.y = Math.sin(angle) * y;

		return this;   // method chaining
	},



	// Check if the `x` and `y` values of this `Vector` are equal to given ones. Either one `Vector` object or two raw values can be passed.
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