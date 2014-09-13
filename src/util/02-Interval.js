// 02-util/02-Interval



exports.Interval = Interval;
exports.i = function (callback, interval) {
	return new Interval(callback, interval);
};



// Let `Interval` inherit from `RenderingInterval`.
inherit(Interval, RenderingInterval);



function Interval (callback, interval) {
	RenderingInterval.call(this, callback);

	this.interval = interval;
}



Interval.prototype._queue = function () {
	setTimeout(this._call.bind(this), this.interval);
};