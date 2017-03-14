// `RenderingInterval` is a special interval used for rendering. It leverages the browser's `requestAnimationFrame` (https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to be FPS- and battery-friendly.
var RenderingInterval = exports.RenderingInterval = {



	// Initialize a new `RenderingInterval` that calls `callback` when `running()`.
	init: function (callback) {
		// A reference to the callback to be called regularly.
		this.callback = callback || noop;
		// If the interval is running.
		this._r = false;

		return this;   // method chaining
	},



	// Return if the interval is running.
	running: function () {
		return this._r;
	},



	// Start the interval, calling `_q()` and setting `_r` to `true`.
	start: function () {
		if(!this._r){
			this._r = true;
			this._q();
		}

		return this;   // method chaining
	},



	// Stop the interval, setting `_r` to `false`.
	stop: function () {
		this._r = false;

		return this;   // method chaining
	},



	// Call the actual `callback`.
	_c: function () {
		if(this._r){
			this.callback();
			this._q();
		}
	},



	// Request the next call to `callback` using `requestAnimationFrame`.
	_q: function () {
		requestAnimationFrame(this._c.bind(this));
	}



};



// Export a shorthand.
var ri = exports.ri = function (callback) {
	return inherit(RenderingInterval)
	.init(callback);
};