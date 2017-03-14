var extend = require('./01-helpers').extend
var inherit = require('./01-helpers').inherit
var Node = require('./03-Node').Node

// `Shape` is a base class providing `fillColor`, `strokeColor` and `lineWidth`.
var Shape = exports.Shape = extend(inherit(Node), {



	init: function (options) {
		options = options || {};
		var thus = this;   // proxy

		Node.init.call(thus, options);

		// The color the shape will be filled with. Can be any valid CSS color. Default is `gray`.
		thus.fillColor = options.fillColor || 'gray';
		// The color the shape will be bordered with. Can be any valid CSS color. Default is `black`.
		thus.strokeColor = options.strokeColor || 'black';
		// The width of the border. Default is `0`.
		thus.lineWidth = (options.lineWidth === 0) ? 0 : options.lineWidth || 0;

		return thus;   // method chaining
	},


	// Prepare drawing the shape by changing the colors of the canvas rendering context.
	draw: function () {
		var context = this._rn.context;   // proxy

		context.fillStyle = this.fillColor;
		context.strokeStyle = this.strokeColor;
		context.lineWidth = this.lineWidth;
	}



});
