// shapes/Polygon



// A `Polygon` is a `Shape` bounded by a list of vertix nodes.
var Polygon = exports.Polygon = extend(inherit(Shape), {



	init: function (options) {
		options = options || {};

		Shape.init.call(options);    // call the super class constructor

		// The list of vertex nodes the polygon exists of.
		// User might want to access the list of vertex, which is why `_vertices` is aliased as `vertices`. `draw` uses `_vertices` to play nice with `Rectangle` and `Square` (both inheriting from `Polygon`).
		this._vertices = this.vertices = new Array(options.vertices);

		return this;   // method chaining
	},



	// Draw the polygon to the canvas.
	draw: function () {
		// proxies
		var thus = this,
		context = thus._root.context,
		vertices = thus._vertices;

		// prepare drawing
		Shape.draw.call(thus);
		context.beginPath();

		for (var vertex, i = 0, length = vertices.length; i < length; i++) {
			vertex = thus._absolute(vertices[i], thus._absPosition, thus._absRotation);
			context[i === 0 ? 'moveto' : 'lineTo'](vertex.x|0, vertex.y|0);
		}

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();
	}



});



// Export a shorthand.
var p = exports.p = function (options) {
	return inherit(Polygon)
	.init(options);
};