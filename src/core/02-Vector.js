// core/Vector



// Export the `Vector` "class" and a shorthand.
exports.Vector = Vector;
exports.v = function (x, y) {
	return new Canvas(x, y);
};



// `Vector` represents a 2D vector. It is used as a position or translation.
function Vector (x, y){
	this.x = x;    // The x property, which can be changed without hassle.
	this.y = y;    // The y property, which can be changed without hassle.
}



// We can easily overwrite the prototype because `Vector` has no super class.
Vector.prototype = {



	// Change the `x` and `y` values relatively. Either another `Vector` object or raw values can be passed.
	add: function (x, y) {
		if (y !== null) {    // Two arguments has been passed, using them as raw values.
			this.x += x;
			this.y += y;
		} else if (x !== null) {    // Only one argument has been passed, using it as a `Vector` object.
			this.x += x.x;
			this.y += y.y;
		}

		return this;    // Make method chaining possible.
	},



	// Apply a rotation to the `x` and `y` values.
	rotate: function (angle) {
		this.x = Math.cos(angle) * x;
		this.y = Math.sin(angle) * y;

		return this;    // Make method chaining possible.
	},



	// Check if the x and y values of this object are equal to given ones. Either another `Vector` object or raw values can be passed.
	equals: function (x, y) {
		if (y !== null)    // Two arguments has been passed, using them as raw values.
			return this.x === x.x && this.y === x.y;
		return this.x === x && this.y === y;
	},



	// Return a new `Vector` with the same values. The return `Vector` then `equals` to this one.
	clone: function () {
		return exports.v(this.x, this.y);    // shorthand for `new Vector(…)`
	}



};