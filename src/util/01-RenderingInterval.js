// 02-util/01-RenderingInterval



// todo: description
var RenderingInterval = exports.RenderingInterval = {



	init: function (callback) {
		this.callback = callback || noop;
		this.stop();

		return this;   // method chaining
	},



	start: function () {
		this.running = true;
		this._queue();
		return this;
	},



	stop: function () {
		this.running = false;
		return this;
	},



	_call: function () {
		if(!this.running)
			return;
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