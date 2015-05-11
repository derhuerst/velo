// `Interval` is a helper for calling `callback` every `interval` milliseconds.
var Interval = exports.Interval = extend(inherit(RenderingInterval), {



	// Set up an `Interval` that calls `callback` every `interval` milliseconds when `running()`.
	init: function (callback, interval) {
		RenderingInterval.init.call(this, callback);

		// The time between the calls of `callback` in milliseconds.
		this.interval = interval;
	},



	// Request the next call to `callback` using `setTimeout`.
	_q: function () {
		setTimeout(this._c.bind(this), this.interval);
	}



});



// Export a shorthand.
var i = exports.i = function (callback, interval) {
	return inherit(Interval)
	.init(callback, interval);
};