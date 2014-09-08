// convenience/Circle



// Export the `Circle` "class" and a shorthand.
exports.Circle = Circle;
exports.e = function (options) {
	return new Circle(options);
};



// Let `Circle` inherit from `Shape`.
inherit(Circle, Shape);



// Yeah, a `Circle` is a circle, drawn around its `position`.
function Circle (options) {
	Shape.call(options);    // call the super class constructor

	// The circle's radius. Pretty obvious.
	this.radius = options.radius !== null ? options.radius : 50;
}



// Add methods to the prototype of `Circle`.


// Draw the circle to the canvas.
Circle.prototype.draw = function () {
	// aliases for shorter code
	var thus = this,
	context = thus._root.context;

	// Prepare drawing.
	Shape.draw.call(thus);
	context.beginPath();

	context.arc(0, 0, thus.radius / 2|0, 0, Math.PI * 2);    // todo: Use `|0` here?

	// Finish drawing.
	context.closePath();
	context.fill();
	if (thus.lineWidth > 0)
		context.stroke();
};