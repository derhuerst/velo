// shapes/Ellipse



// `Ellipse` is a ellipse, drawn around its `position`.
var Ellipse = exports.Ellipse = extend(inherit(Shape), {



	init: function (options) {
		options = options || {};

		Shape.init.call(this, options);

		// the ellipse's width, pretty obvious
		this.width = options.width !== null ? options.width : 60;
		// the ellipse's height, pretty obvious
		this.height = options.height !== null ? options.height : 40;

		return this;   // method chaining
	},



	// Draw the ellipse to the canvas.
	draw: function () {
		// aliases for shorter code
		var thus = this,
		context = thus._root.context;

		// Prepare drawing.
		context.save();
		Shape.draw.call(thus);
		context.translate(thus._absPosition|0);
		context.rotate(thus._absRotation);
		context.scale(1, thus.height / thus.width);   // todo: Use `|0` here?
		context.beginPath();

		context.arc(0, 0, thus.width / 2|0, 0, Math.PI * 2);   // todo: Use `|0` here?

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();
		context.restore();
	}



});



// Export a shorthand.
var e = exports.e = function (options) {
	return inherit(Ellipse)
	.init(options);
};