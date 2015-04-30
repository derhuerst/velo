// shapes/Shape



// `Shape` is a base class providing `fillColor`, `strokeColor` and `lineWidth`.
var Shape = exports.Shape = extend(inherit(Node), {



	init: function (options) {
		options = options || {};

		Node.init.call(this, options);

		// The color the shape will be filled with. Can be any valid CSS color.
		this.fillColor = options.fillColor || 'gray';
		// The color the shape will be bordered with. Can be any valid CSS color.
		this.strokeColor = options.strokeColor || 'black';
		// The width of the border.
		this.lineWidth = options.lineWidth !== null ? options.lineWidth : 1;

		return this;   // method chaining
	},


	// Prepare drawing the shape by changing the colors of the canvas rendering context.
	draw: function () {
		var context = this._root.context;   // proxy

		context.fillStyle = this.fillColor;
		context.strokeStyle = this.strokeColor;
		context.lineWidth = this.lineWidth;
	}



});



// Export a shorthand.
var c = exports.c = function (element) {
	return inherit(Canvas)
	.init(element);
};