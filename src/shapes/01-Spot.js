// shapes/Spot



// `Spot` is a point in the visual sense: It is rendered as a small colored circle.
var Spot = exports.Spot = extend(inherit(Shape), {



	init: function (options) {
		options = options || {};

		Shape.init.call(this, options);

		// The size of the rendered dot.
		this.size = options.size !== null ? options.size : 2;

		return this;   // method chaining
	},



	// Draw a little dot to the canvas.
	draw: function () {
		var thus = this,
		x = thus._aP.x|0,
		y = thus._aP.y|0,
		size = thus.size|0;   // `|0` is equivalent to `Math.floor(…)`

		Shape.draw.call(thus);   // prepare drawing

		thus._rn.context.fillRect(x, y, size, size);
		if (thus.lineWidth > 0)
			thus._rn.context.strokeRect(x, y, size, size);

		// call `_u()` on all child nodes
		array.foreach(this.children, '_u');
	}



});



// Export a shorthand.
var s = exports.s = function (options) {
	return inherit(Spot)
	.init(options);
};