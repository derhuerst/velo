// 02-util/02-Interval



// A helper for calling `callback` every `interval` milliseconds.
var Interval = exports.Interval = extend(inherit(RenderingInterval), {



	init: function (callback, interval) {
		RenderingInterval.init.call(this, callback);

		this.interval = interval;
	},



	_queue: function () {
		setTimeout(this._call.bind(this), this.interval);
	}



});



// Export a shorthand.
var i = exports.i = function (callback, interval) {
	return inherit(Interval)
	.init(callback, interval);
};