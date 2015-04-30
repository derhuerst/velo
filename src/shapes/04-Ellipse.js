// shapes/Ellipse



// Export the `Ellipse` "class" and a shorthand.
exports.Ellipse = Ellipse;
exports.e = function (options) {
	return new Ellipse(options);
};



// Let `Ellipse` inherit from `Shape`.
inherit(Ellipse, Shape);



// Yeah, a `Ellipse` is a ellipse, drawn around its `position`.
function Ellipse (options) {
	options = options || {};

	Shape.call(options);    // call the super class constructor

	// The ellipse's width. Pretty obvious.
	this.width = options.width !== null ? options.width : 60;
	// The ellipse's height. Pretty obvious.
	this.height = options.height !== null ? options.height : 40;
}



// Add methods to the prototype of `Ellipse`.


// Draw the ellipse to the canvas.
Ellipse.prototype.draw = function () {
	// aliases for shorter code
	var thus = this,
	context = thus._root.context;

	// Prepare drawing.
	context.save();
	Shape.draw.call(thus);
	context.translate(thus._absPosition|0);
	context.rotate(thus._absRotation);
	context.scale(1, thus.height / thus.width);    // todo: Use `|0` here?
	context.beginPath();

	context.arc(0, 0, thus.width / 2|0, 0, Math.PI * 2);    // todo: Use `|0` here?

	// Finish drawing.
	context.closePath();
	context.fill();
	if (thus.lineWidth > 0)
		context.stroke();
	context.restore();
};