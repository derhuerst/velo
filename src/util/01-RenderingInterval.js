// 02-util/01-RenderingInterval



// A special interval used for rendering. It leverages the browser's `requestAnimationFrame` to be FPS- and battery-friendly.
var RenderingInterval = exports.RenderingInterval = {



	init: function (callback) {
		this.callback = callback || noop;
		this.running = false;

		return this;   // method chaining
	},



	start: function () {
		this.running = true;
		this._queue();

		return this;   // method chaining
	},



	stop: function () {
		this.running = false;

		return this;   // method chaining
	},



	_call: function () {
		if(!this.running) return;
		this.callback();
		this._queue();
	},


	_queue: function () {
		requestAnimationFrame(this._call.bind(this));
	}



};



// Export a shorthand.
var ri = exports.ri = function (callback) {
	return inherit(RenderingInterval)
	.init(callback);
};