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
		Shape.draw.call(this);

		// aliases for shorter code
		var thus = this,
		context = thus._rn.context;

		// Prepare drawing.
		context.save();
		Shape.draw.call(thus);
		context.translate(round(thus._aP.x), round(thus._aP.y));
		context.rotate(thus._aR);
		context.scale(1, thus.height / thus.width);   // todo: round here?
		context.beginPath();

		context.arc(0, 0, round(thus.width / 2), 0, Math.PI * 2);

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();
		context.restore();

		// call `draw()` on all child nodes
		array.foreach(this.children, 'draw');
	}



});



// Export a shorthand.
var e = exports.e = function (options) {
	return inherit(Ellipse)
	.init(options);
};