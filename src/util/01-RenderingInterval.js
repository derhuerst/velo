// A special interval used for rendering. It leverages the browser's `requestAnimationFrame` to be FPS- and battery-friendly.
var RenderingInterval = exports.RenderingInterval = {



	init: function (callback) {
		this.callback = callback || noop;
		this._r = false;

		return this;   // method chaining
	},



	running: function () {
		return this._r;
	},



	start: function () {
		if(!this._r){
			this._r = true;
			this._q();
		}

		return this;   // method chaining
	},



	stop: function () {
		this._r = false;

		return this;   // method chaining
	},



	_c: function () {
		if(this._r){
			this.callback();
			this._q();
		}
	},



	_q: function () {
		requestAnimationFrame(this._c.bind(this));
	}



};



// Export a shorthand.
var ri = exports.ri = function (callback) {
	return inherit(RenderingInterval)
	.init(callback);
};