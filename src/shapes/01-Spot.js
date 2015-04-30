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
		// proxies
		var thus = this,
		context = thus._root.context,
		position = thus._absPosition,
		size = thus.size|0;   // `|0` is equivalent to `Math.floor(…)`

		Shape.draw.call(thus);   // prepare drawing

		context.fillRect(position.x|0, position.y|0, size, size);
		if (thus.lineWidth > 0)
			context.strokeRect(position.x|0, position.y|0, size, size);
	}



});



// Export a shorthand.
var s = exports.s = function (options) {
	return inherit(Spot)
	.init(options);
};