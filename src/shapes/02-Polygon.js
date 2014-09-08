// shapes/Polygon



// Export the `Polygon` "class" and a shorthand.
exports.Polygon = Polygon;
exports.p = function (options) {
	return new Polygon(options);
};



// Let `Polygon` inherit from `Shape`.
inherit(Polygon, Shape);



// A polygon is a shape bounded by a list of vertix nodes.
function Polygon (options) {
	options = options || {};

	Shape.call(options);    // call the super class constructor

	// The list of vertex nodes the polygon exists of.
	// User might want to access the list of vertex ndoes, which is why `_vertices` is aliased as `vertices`. `draw` uses `_vertices` to play nice with `Rectangle` and `Square` (both inheriting from `Polygon`).
	this._vertices = this.vertices = exports.l(options.vertices);
}



// Add methods to the prototype of `Polygon`.


// Draw the polygon to the canvas.
Polygon.prototype.draw = function () {
	// aliases for shorter code
	var thus = this,
	context = thus._root.context,
	vertices = thus._vertices;

	// Prepare drawing.
	Shape.draw.call(thus);
	context.beginPath();
	var i, vertex;

	for (i = 0, length = vertices.length; i < length; i++) {
		vertex = thus._absolute(vertices[i], thus._absPosition, thus._absRotation);
		context[i === 0 ? 'moveto' : 'lineTo'](vertex.x|0, vertex.y|0);
	}

	// Finish drawing.
	context.closePath();
	context.fill();
	if (thus.lineWidth > 0)
		context.stroke();
};