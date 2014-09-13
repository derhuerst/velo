// core/Vector
// `Vector` represents a 2D vector. It is used as a position or translation.



// Export the `Vector` "class" and a shorthand.
exports.Vector = Vector;
exports.v = function (x, y) {
	return new Vector(x, y);
};



// Create a new Vector by `x` and `y`.
function Vector (x, y){
	this.x = x || 0;    // The x property, which can be changed without hassle.
	this.y = y || 0;    // The y property, which can be changed without hassle.
}



// We can easily overwrite the prototype because `Vector` has no super class.
Vector.prototype = {



	// Change the `x` and `y` values relatively. Either one `Vector` object or two values can be passed.
	add: function (x, y) {
		if (y !== null) {    // Two arguments have been passed, using them as raw values.
			this.x += x;
			this.y += y;
		} else if (x !== null) {    // Only one argument has been passed, using it as a `Vector` object.
			this.x += x.x;
			this.y += y.y;
		}

		return this;    // Make method chaining possible.
	},



	// Apply a rotation of `angle` to the `x` and `y` values.
	rotate: function (angle) {    // todo: length
		this.x = Math.cos(angle) * x;
		this.y = Math.sin(angle) * y;

		return this;    // Make method chaining possible.
	},



	// Check if the `x` and `y` values of this vector are equal to given ones. Either one `Vector` object or two values can be passed.
	equals: function (x, y) {
		if (y !== null)    // Two arguments has been passed, using them as raw values.
			return this.x === x.x && this.y === x.y;
		return this.x === x && this.y === y;
	},



	// Return a new `Vector` object with the same values. The returned vector then `equals` to this one.
	clone: function () {
		return exports.v(this.x, this.y);    // shorthand for `new Vector(…)`
	}



};