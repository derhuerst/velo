// 02-util/02-Interval



exports.Interval = Interval;
exports.i = function (callback, interval) {
	return new Interval(callback, interval);
};



function Interval (callback, interval) {
	Rendering.call(this, callback);

	this.interval = interval;
}



__extends(Interval, Rendering);



Interval.prototype._queue = function () {
	setTimeout(this._call, this.interval);
};