// shapes/Polygon



// A `Polygon` is a `Shape` bounded by a list of vertix nodes.
var Polygon = exports.Polygon = extend(inherit(Shape), {



	init: function (options) {
		options = options || {};

		Shape.init.call(this, options);    // call the super class constructor

		// The list of vertex nodes the polygon exists of.
		// User might want to access the list of vertex, which is why `_v` is aliased as `vertices`. `draw` internally uses `_v`.
		this._v = this.vertices = new Array(options.vertices);

		return this;   // method chaining
	},



	// Draw the polygon to the canvas.
	draw: function () {
		// proxies
		var thus = this,
		context = thus._rn.context,
		vertex, i, length;

		// prepare drawing
		Shape.draw.call(thus);
		context.beginPath();

		for (i = 0, length = thus._v.length; i < length; i++) {
			vertex = thus._v[i].clone().rotate(thus._aR).add(thus._aP);
			context[i === 0 ? 'moveTo' : 'lineTo'](vertex.x|0, vertex.y|0);
		}

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();

		// call `draw()` on all child nodes
		array.foreach(this.children, 'draw');
	}



});



// Export a shorthand.
var p = exports.p = function (options) {
	return inherit(Polygon)
	.init(options);
};