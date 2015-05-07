var Transition = exports.Transition = {



	// set up the `Transition` of a `node`'s properties
	init: function (node, properties, options) {
		var thus = this;   // proxy

		// The node the properties get changed of.
		thus._n = node;

		// An object with the properties to animate. The values are *relative* to the ´node´s original properties.
		// Example:
		// {
		//    rotation: Math.PI/2
		//    radius: -30
		// }
		thus._p = properties;
		// Because the `node`'s properties change during the transition, the original values have to be copied.
		thus._oP = {};
		for (property in thus._p) {
			thus._oP[property] = thus._n[property];
		}

		options = options || {};
		// The duration of the transition in milliseconds.
		thus._d = options.duration || 1000;
		// The easing function to be used.
		// > An easing function is usually a function that describes the value of a property given a percentage of completeness.
		// — http://stackoverflow.com/a/8317722
		thus._e = options.easing || easing['default'];
		// The time of the transition's beginning. Can be used to delay a transition by passing a number bigger than `Date.now()`.
		// todo: add an optional `options.delay`
		thus._s = options.start || Date.now();

		return thus;   // method chaining
	},



	update: function () {
		var thus = this;   // proxy

		var elapsed = Date.now() - thus._s;
		// abort if the animation hasn't begun or is already finished.
		if (elapsed < 0) return;
		if (elapsed > thus._d) this.finish();
		var factor = thus._e(elapsed / thus._d);

		for (var property in thus._p) {
			// originalProperty + propertyDelta * easing( elapsed / duration )
			// todo: what to do with getter/setter?
			thus._n[property] = thus._oP[property] + thus._p[property] * factor;
		}

		return thus;   // method chaining
	},



	finish: function () {
		var thus = this;   // proxy

		for (var property in thus._p) {
			// todo: what to do with getter/setter?
			thus._n[property] = thus._oP[property] + thus._p[property];
		}

		return thus;   // method chaining
	}



};



// Export a shorthand.
var a = exports.a = function (node, properties, options) {
	return inherit(Transition)
	.init(node, properties, options);
};



// `velo.easing` holds all easing functions available in *velo*. They all have the same signature (http://en.m.wikipedia.org/wiki/Type_signature#Signature).
// > An easing function is usually a function that describes the value of a property given a percentage of completeness.
// — http://stackoverflow.com/a/8317722
var easing = exports.easing = {};



// Linear easing.
easing.default = easing.linear = function (p){
	return p;
};