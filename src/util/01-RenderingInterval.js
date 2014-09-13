// 02-util/01-RenderingInterval



exports.RenderingInterval = RenderingInterval;
exports.ri = function (callback) {
	return new RenderingInterval(callback);
};



function RenderingInterval (callback) {
	this.callback = callback || noop;
	this.stop();
}



RenderingInterval.prototype = {



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