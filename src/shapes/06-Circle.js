// shapes/Circle



// Yeah, a `Circle` is a circle, drawn around its `position`.
var Circle = exports.Circle = extend(inherit(Shape), {



	init: function (options) {
		options = options || {};

		Shape.init.call(this, options);

		// The circle's radius. Pretty obvious.
		this.radius = options.radius !== null ? options.radius : 50;

		return this;   // method chaining
	},


	// Draw the circle to the canvas.
	draw: function () {
		// aliases for shorter code
		var thus = this,
		context = thus._rn.context;

		// Prepare drawing.
		Shape.draw.call(thus);
		context.beginPath();

		context.moveTo(thus._aP.x|0, thus._aP.y|0);
		context.arc(0, 0, thus.radius|0, 0, Math.PI * 2);    // todo: Use `|0` here?

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();

		// call `_u()` on all child nodes
		array.foreach(this.children, '_u');
	}



});



// Export a shorthand.
var cl = exports.cl = function (options) {
	return inherit(Circle)
	.init(options);
};