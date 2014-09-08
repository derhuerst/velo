// core/helpers



// todo: strict mdoe



// A do-nothing function used as a default callback.
var noop = function () {};



// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
var hasProp = {}.hasOwnProperty;



// Let the child child "class" inherit from the parent "class".
// Taken from the CoffeeScript project (http://techoctave.com/c7/posts/93-simple-javascript-inheritance-using-coffeescript-extends).
var inherit = function (child, parent) {
	for (var key in parent) {
		if (hasProp.call(parent, key))
			child[key] = parent[key];
	}

	function ctor() {
		this.constructor = child;
	}

	ctor.prototype = parent.prototype;
	child.prototype = new ctor();

	return child;
};



// Extend the `target` object by the keys and values of the `source` object.
// Stolen from the zepto.js project (https://github.com/madrobby/zepto/blob/1d94d92223a5ec2edf1fbe18a7a9cc717e7663e4/src/zepto.js#L223) and customized.
var extend = function (target, source) {
	for (key in source) {
		if (source[key] !== undefined)
			target[key] = source[key];
	}
	return target
};