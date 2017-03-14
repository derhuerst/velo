// A `Transition` changes a `Node`'s properties over a given duration by a given value.
var Transition = exports.Transition = {



	// Set up the `Transition` of a `node`'s `properties`.
	init: function (node, properties, options) {
		var thus = this;   // proxy

		// Stores if the transition is already finished.
		thus.finished = false;

		// The node the properties get changed of.
		thus._n = node;

		// An object with the properties to animate. The values are *relative* (get added) to the `node`s original properties.
		// Example:
		// {
		//    rotation: Math.PI/2
		//    radius: -30
		// }
		thus._p = properties;
		// Because the `node`'s properties change during the transition, the original values have to be copied.
		thus._oP = {};
		// For each of the properties to animate, `_f` stores if they are set by getter/setter functions.
		thus._f = {};
		for (var property in thus._p) {
			if (typeof thus._n[property] === 'function'){
				thus._oP[property] = thus._n[property]();
				thus._f[property] = true;
			} else {
				thus._oP[property] = thus._n[property];
				thus._f[property] = false;
			}
		}

		options = options || {};
		// The duration of the transition in milliseconds.
		thus._d = options.duration || 1000;
		// *A reference* to the easing function to be used.
		// > Easing functions specify the rate of change of a parameter over time.
		// — http://easings.net/en
		thus._e = options.easing || easing['linear'];
		// The JavaScript timestamp (https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/now) the transition will start. Can be used to delay a transition by passing a number bigger than `Date.now()`.
		// todo: add an optional `options.delay`
		thus._s = options.start || Date.now();

		return thus;   // method chaining
	},



	// Update the `properties` according to the current progress of the transition, which is influenced by the easing function. Call `finish()` in the end.
	update: function () {
		var thus = this;   // proxy

		// Abort if the transition is already finished.
		if (thus.finished) return;

		var elapsed = Date.now() - thus._s;
		// Abort if the transition hasn't begun.
		if (elapsed < 0) return;
		// Finish the transition if it isn't finished yet but the duration is elapsed.
		if (elapsed > thus._d) return thus.finish();

		// Compute the factor using the easing function and call `_a` with it.
		thus._a(thus._e(elapsed / thus._d));

		return thus;   // method chaining
	},



	// Finish the transition, setting the `node`'s `properties` to their final values and `finished` to `true`.
	finish: function () {
		this._a(1);
		this.finished = true;

		return this;   // method chaining
	},



	// Apply `factor` to the transition of all `properties.
	_a: function (factor) {
		var thus = this,   // proxy
		property;

		for (property in thus._p) {
			// originalProperty + propertyDelta * easing( elapsed / duration )
			value = thus._oP[property] + thus._p[property] * factor;
			if (thus._f[property])
				thus._n[property](value);
			else
				thus._n[property] = value;
		}
	}



};



// Export a shorthand.
var t = exports.t = function (node, properties, options) {
	return inherit(Transition)
	.init(node, properties, options);
};



// `velo.easing` holds all easing functions *velo* has been built with. They all have the same signature (http://en.m.wikipedia.org/wiki/Type_signature#Signature).
// > Easing functions specify the rate of change of a parameter over time.
// — http://easings.net/en
var easing = exports.easing = {};



// Linear easing.
easing.linear = function (p){
	return p;
};