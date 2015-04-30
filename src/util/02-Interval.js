// 02-util/02-Interval



// todo: description
var Interval = exports.Interval = extend(inherit(RenderingInterval), {



	init: function (callback, interval) {
		RenderingInterval.call(this, callback);

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